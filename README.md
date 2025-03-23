# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

В проекте используется модель MVP:

- Model. Отвечает за хранение и обработку данных.
- View. Показывает пользователю интерфейс и данные из model.
- Presenter. Некая прослойка между model и view, которая ими управляет, а так же, обрабатывает пользовательский ввод.

## Типы данных

### Продукт в каталоге

```ts
interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
    category: string;
}
```

### Весь каталог

```ts
interface IProductData {
    items: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
    getProducts(): IProduct[];
}
```

### Продукт в корзине

```ts
interface ICart {
    id: string;
    title: string;
    price: number | null;
    count: number;
}
```

### Корзина пользователя

```ts
interface ICartData {
    items: IProduct[];
    addProduct(product: IProduct): void;
    getProduct(productId: string): IProduct;
    getTotalPrice(): number | null;
    deleteProduct(productId: string): void;
    clearCart(): void;
}
```

### Информация о покупателе

```ts
interface IOrder {
    paymentType: string;
    address: string;
    email: string;
    phone: string;
}
```

### Оформление заказа

```ts
interface IOrderData {
    order: IOrder;
    validatedOrder(): boolean;
    setOrderField(field: keyof IOrder, value: IOrder[keyof IOrder]): void;
    clearOrder(): void;
}
```
