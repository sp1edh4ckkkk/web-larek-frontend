# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/model/ — папка с моделями
- src/components/view/ — папка с вьюхами

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

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

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
    products: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
    setProducts(products: IProduct[]): void;
    setPreview(product: IProduct): void;
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
    products: IProduct[];
    count: number | null;
    total: number | null;
    addProduct(product: IProduct): void;
    getTotalPrice(): number | null;
    deleteProduct(productId: string): void;
    clearCart(): void;
}
```

### Информация о покупателе

```ts
interface IOrder {
    paymentType: TPaymentType;
    address: string;
    email: string;
    phone: string;
}
```

### Оформление заказа

```ts
export interface IOrderData {
    setOrderDetails(paymentType: TPaymentType, address: string): void;
    setContactDetail(email: string, phone: string): void;
}
```

## Базовый код

### Класс Api

Содержит в себе логику отправки запросов.

Конструктор:
```ts
constructor(baseUrl: string, options: RequestInit = {})
```

Поля:
- `readonly baseUrl: string` - Базовый URL для отправки запросов.
- `protected options: RequestInit` - Опции для настройки запросов.

Методы:
- `protected handleResponse(response: Response): Promise<object>` - Обрабатывает ответ от API. Если `true`, метод возвращает данные в формате JSON. Если `false`, метод возвращает ошибку.
- `get(uri: string)` - GET запрос, который возвращает ответ с сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - запрос, который принимает объект с данными и передаёт их в JSON формате, как параметр при вызове метода. По умолчанию выполняется POST запрос, но также метод запроса может быть изменён дополнительным параметром.

### Класс EventEmitter

Позволяет отправлять события и подписываться на события, происходящие в системе.

Конструктор:
```ts
constructor()
```

Поля:
- `_events: Map<EventName, Set<Subscriber>>`

Методы:
- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - Отвечает за подписку на событие.
- `off(eventName: EventName, callback: Subscriber)` - Отвечает за отписку от события.
- `emit<T extends object>(eventName: string, data?: T)` - Уведомляет подписчиков о наступлении события.
- `onAll(callback: (event: EmitterEvent) => void)` - Отвечает за подписку на все события.
- `offAll()` - Сбрасывает всех подписчиков.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - Генерирует событие с заданными аргументами. Можно использовать в качестве обработчика собития в других классах.

## Слой данных

### Класс ProductModel

Класс отвечает за хранение и логику работы с данными товаров.

Конструктор:
```ts
constructor(protected events: IEvents)
```

Поля:
- `products: IProduct[]` - Объекты товаров.
- `preview: string | null` - id товара, выбранного для просмотра в модальном окне.
- `events: IEvents` - Экземпляр класса EventEmitter.

Методы:
- `getProduct(productId: string): IProduct` - Получает товар по id.
- `setProducts(products: IProduct[]): void` - Заполняет массив товаров.
- `setPreview(product: IProduct): void` - Устанавливает статус выбранного товара.
- `get products(): IProduct[]` - Получает массив товаров.
- `get preview(): string | null` - Получает статус товара.

### Класс CartModel

Класс отвечает за хранение и логику работы с данными корзины.

Конструктор:
```ts
constructor(events: IEvents)
```

Поля:
- `products: IProduct[]` - Объекты товаров в корзине.
- `count: number` - Количество товаров в корзине.
- `total: number` - Итоговая сумма товаров в корзине.
- `events: IEvents` - Экземпляр класса EventEmitter.

Методы:
- `addProduct(product: IProduct): void`- Добавляет товар в корзину.
- `getTotalPrice(): number | null`- Получает общую стоимость товаров в корзине.
- `deleteProduct(productId: string): void` - Удаляет товар из корзины.
- `clearCart(): void` - Очичает корзину.
- `get products(): IProduct[]` - Получает массив товаров в корзине.

### Класс OrderModel

Класс отвечает за хранение и логику работы с данными заказа.

Конструктор:
```ts
constructor(protected events: IEvents)
```

Поля:
- `order: Partial<IOrder> = { paymentType: '', address: '', email: '', phone: '' }` - Объект заказа.
- `formErrors: TFormErrors` - Форма ошибок.

Методы:
- `validatedOrder(): boolean`- Валидирует поля формы.
- `setOrderField(field: keyof IOrder, value: IOrder[keyof IOrder]): void`- Устанавливает значение в переданное поле формы заказа, а также валидирует его.
- `createOrder(items: string[], total: number): IOrder`- Создаёт заказ.
- `get order(): Partial<IOrder>` - Получает данные из поля класса.

## Классы представления

### PageView

Класс отвечает за отображение главной страницы сайта.

Конструктор:
```ts
constructor(container: HTMLElement, protected events: EventEmitter)
```

Поля:
- `main: HTMLElement` - Вся контентная часть сайта.
- `products: HTMLElement` - Товар на главной странице.
- `counter: HTMLElement` - Количество товаров в корзине.
- `cart: HTMLElement` - Корзина на главной странице.

Методы:
- `set products(items: HTMLElement[])`- Вывод на страницу массива товаров.
- `set counter(value: number)`- Устанавливает количество товаров в корзине.
- `set modalOpen(value: boolean)`- Блокирует прокрутку окна с открытым модальным окном.

### ProductView

Класс отвечает за отображение товара на главной странице сайта.

Конструктор:
```ts
constructor(container: HTMLElement, protected events: EventEmitter)
```

Поля:
- `(id, title, description, image, price, category): HTMLElement`.

Методы:
- set и get методы, для сохранения и получения данных из полей класса.

### CartView

Класс корзины.

Конструктор:
```ts
constructor(container: HTMLElement, protected events: EventEmitter)
```

Поля:
- `items: HTMLElement` - Товары в корзине.
- `totalPrice: HTMLElement` - Сумма корзины.

Методы:
- `set items(items: HTMLElement[])` - Выводит список товаров или показывает пустую квартиру.
- `set totalPrice(totalPrice: number)` - Отображает стоимость корзины.

### OrderView

Класс формы выбора способа оплаты и адреса.

Конструктор:
```ts
constructor(container: HTMLElement, protected events: EventEmitter)
```

Методы:
- `clearPaymentType()` - Сбрасывает метод оплаты пользователя.
- `set address(value: string)` - Меняет значение в поле класса.

### SuccessView

Класс отвечающий за показ окна об успешной покупке.

Конструктор:
```ts
constructor(container: HTMLElement, protected events: EventEmitter)
```

Поля:
- `totalPrice: HTMLElement` - Итоговая стоимость покупки.
- `btnClose: HTMLElement` - Кнопка закрытия модального окна.

Методы:
- `set totalPrice(value: number)` - Меняет итоговую стоимость покупки.

## Компоненты

Весь код для взаимодействия компонентов между собой находится в файле index.ts - презентер

Список всех событий:

- `product:change` - Изменить данные товара.
- `product:select` - Запись id товара для получения данных о товаре.
- `product:add` - Добавление товара в корзину.
- `preview:change` - Изменение отображения товара.
- `modal:open` - Открыть модальное окно.
- `modal:close` - Закрыть модальное окно.
- `cart:open` - Открыть корзину.
- `cart:change` - Изменить корзину.
- `order:open` - Перейти к покупке.
- `order:change` - Изменить данные в форме оформления товара.
- `order:submitPayments` - Отправить форму оплаты и адреса.
- `order:submitContacts` - Отправить форму почты и телефона.
