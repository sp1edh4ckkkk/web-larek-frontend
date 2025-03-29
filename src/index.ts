import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { WebApi } from './components/base/web_api';

import { ProductModel } from './components/models/product_model';
import { CartModel } from './components/models/cart_model';
import { OrderModel } from './components/models/order_model';

import { PageView } from './components/views/page_view';
import { ModalView } from './components/views/modal_view';
import { ProductView } from './components/views/product_view';
import { CartView } from './components/views/cart_view';
import { OrderDetailView } from './components/views/order_detail_view';
import { OrderContactsView } from './components/views/order_contacts_view';
import { SuccessView } from './components/views/success_view';

import { IProduct, TCartItem, TOrderForm } from './types';

import { cloneTemplate } from './utils/utils';
import { API_URL } from './utils/constants';

const galleryTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const previewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cartTemplate: HTMLTemplateElement = document.querySelector('#basket');
const cardCartTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const orderDetailTemplate: HTMLTemplateElement = document.querySelector('#order');
const orderContactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const successTemplate: HTMLTemplateElement = document.querySelector('#success');

const events = new EventEmitter();
const api = new WebApi(API_URL);

const productModel = new ProductModel(events);
const cartModel = new CartModel(events);
const orderModel = new OrderModel(events);

const pageView = new PageView(document.body, events);
const modalView = new ModalView(document.querySelector('#modal-container'), events);
const cartView = new CartView(cloneTemplate(cartTemplate), events);
const orderDetailView = new OrderDetailView(cloneTemplate(orderDetailTemplate), events);
const orderContactsView = new OrderContactsView(cloneTemplate(orderContactsTemplate), events);


api.getProducts()
    .then((products) =>
        productModel.setProducts(products)
    )
    .catch((error) =>
        console.log(error)
    );

events.on('products:change', () => {
    const products = productModel.products.map((product) => {
        const productObject = new ProductView(cloneTemplate(galleryTemplate), {
            onClick: () => { events.emit('product:select', product) }
        });
        return productObject.render(product);
    });
    pageView.render({ gallery: products });
});

events.on('product:select', (product: IProduct) => {
    productModel.setPreview(product);
});

events.on('product:add', (product: TCartItem) => {
    cartModel.addProduct(product);
});

events.on('preview:change', (product: IProduct) => {
    const productObject = new ProductView(cloneTemplate(previewTemplate), {
        onClick: () => {
            events.emit('preview:change', product);
            events.emit('product:add', product);
            modalView.close();
        }
    });
    modalView.render({
        content: productObject.render({
            ...product,
            cartBtn: cartModel.getButton(product)
        })
    });
});

events.on('cart:open', () => {
    modalView.render({ content: cartView.render() });
});

events.on('cart:change', () => {
    cartView.totalPrice = cartModel.getTotalPrice();
    pageView.counter = cartModel.getCounter();
    cartView.products = cartModel.products.map((product, index) => {
        const cardCart = new ProductView(cloneTemplate(cardCartTemplate), {
            onClick: () => cartModel.deleteProduct(product)
        });
        cardCart.itemIndex = index + 1;
        return cardCart.render({
            title: product.title, price: product.price, id: product.id
        });
    });
});

events.on('formErrors:change', (errors: Partial<TOrderForm>) => {
    const { payment, address, email, phone } = errors;
    orderDetailView.valid = !payment && !address;
    orderDetailView.errors = Object.values({
        payment,
        address
    }).filter(i => !!i).join('; ');
    orderContactsView.valid = !email && !phone;
    orderContactsView.errors = Object.values({
        email,
        phone
    }).filter(i => !!i).join('; ');
});

events.on('modal:open', () => {
    pageView.locked = true;
});

events.on('modal:close', () => {
    pageView.locked = false;
});

events.on('order:open', () => {
    modalView.render({
        content: orderDetailView.render({
            payment: orderModel.order.payment,
            address: orderModel.order.address,
            valid: orderModel.order.payment && orderModel.order.address ? true : false,
            errors: []
        })
    });
});

events.on(/^order\..*:change/, (data: { field: keyof TOrderForm, value: string }) => {
    orderModel.setOrderField(data.field, data.value);
});

events.on('order:submit', () => {
    modalView.render({
        content: orderContactsView.render({
            email: orderModel.order.email,
            phone: orderModel.order.phone,
            valid: orderModel.validateOrder(),
            errors: []
        })
    });
});

events.on('contacts:submit', () => {
    const items = cartModel.products.map((item) => item.id);
    const totalPrice = cartModel.getTotalPrice();

    if (orderModel.validateOrder()) {
        const orderPost = orderModel.createOrder(items, totalPrice);

        api.orderProducts(orderPost)
            .then((response) => {
                const success = new SuccessView(cloneTemplate(successTemplate), {
                    onClick: () => {
                        modalView.close();
                    }
                });

                modalView.render({
                    content: success.render({
                        totalPrice: response.total
                    })
                });

                cartModel.clearCart();
                orderModel.clearOrder();
                orderDetailView.resetPaymentData();
            })
            .catch((error) =>
                console.log(error)
            );
    }
});
