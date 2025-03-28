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
import { FormView } from './components/views/form_view';
import { OrderDetailView } from './components/views/order_detail_view';
import { OrderContactsView } from './components/views/order_contacts_view';
import { SuccessView } from './components/views/success_view';

import { IOrder, IProduct } from './types';

import { cloneTemplate } from './utils/utils';
import { API_URL } from './utils/constants';

const galleryTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const modalTemplate: HTMLElement = document.querySelector('#modal-container');
const previewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cartTemplate: HTMLTemplateElement = document.querySelector('#basket');
// const cartTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const orderDetailTemplate: HTMLTemplateElement = document.querySelector('#order');
const orderContactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');

const events = new EventEmitter();
const api = new WebApi(API_URL);

const productModel = new ProductModel(events);
const cartModel = new CartModel(events);
const orderModel = new OrderModel(events);

const pageView = new PageView(document.body, events);
const modalView = new ModalView(modalTemplate, events);
const cartView = new CartView(cloneTemplate(cartTemplate), events);
const orderDetailView = new OrderDetailView(cloneTemplate(orderDetailTemplate), events);
const orderContactsView = new OrderContactsView(cloneTemplate(orderContactsTemplate), events);


api.getProducts()
    .then((products) => {
        productModel.setProducts(products)
    })
    .catch((err) => {
        console.log(err)
    });

events.on('products:change', () => {
    const products = productModel.products.map((product) => {
        const productObject = new ProductView(cloneTemplate(galleryTemplate), {
            onClick: () => events.emit('product:select', { product })
        });
        return productObject.render(product);
    });
    pageView.render({ gallery: products });
});

events.on('product:select', (product: IProduct) => {
    productModel.setPreview(product);
});

events.on('product:add', (product: IProduct) => {
    cartModel.addProduct(product);
});

events.on('preview:change', (product: IProduct) => {
    const productObject = new ProductView(cloneTemplate(previewTemplate), {
        onClick: () => {
            events.emit('product:add', product);
            events.emit('preview:change', product);
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
    
});

events.on('errors:change', (errors: Partial<IOrder>) => {
    const { paymentType, address, email, phone } = errors;
    order.valid = !paymentType && !address;
    order.errors = Object.values({
        paymentType,
        address
    }).filter((i) => !!i).join('; ');
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({
        email,
        phone
    }).filter((i) => !!i).join('; ');
});

events.on('modal:open', () => {
    pageView.locked = true;
});

events.on('modal:close', () => {
    pageView.locked = false;
});

events.on('order:open', () => {
    
});

events.on('order:change', () => {
    
});

events.on('order:submit', () => {
    modalView.render({
        content: orderContactsView.render({
            email: orderModel.email,
            phone: orderModel.phone,
            valid: orderModel.validatedOrder(),
            errors: []
        })
    });
});

events.on('contacts:submit', () => {
    
});
