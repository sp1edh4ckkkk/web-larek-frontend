import { IProduct } from "../../types";
import { Api, ApiListResponse } from "./api";


export class WebApi extends Api {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    getProducts(): Promise<IProduct[]> {
        return this.get('/product')
            .then((products: ApiListResponse<IProduct>) => {
                products.items.map((item) => item);
            });
    }
}
