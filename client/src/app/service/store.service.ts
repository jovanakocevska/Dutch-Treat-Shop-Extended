import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Order, OrderItem } from "../shared/Order";
import { Product } from "../shared/Product";

@Injectable()
export class Store {

    constructor(private http: HttpClient) {
        console.log("constructor", this.order);
    }

    public products: Product[] = [];

    public order: Order = new Order();

    loadProducts(): Observable<void> {
        return this.http.get<[]>("/api/products")
            .pipe(map(data => {
                debugger;
                console.log('Data from service', data);
                this.products = data;
                return;
            }));
    }

    addToOrder(product: Product) {

        console.log(this.order);

        let item: OrderItem | any;

        if (this.order.items.length > 0)
            item = this.order.items.find(o => o.productId === product.id);

        if (item) {
            item.quantity++;
        } else {

            const item = new OrderItem();
            item.productId = product.id;
            item.productTitle = product.title;
            item.productArtId = product.artId;
            item.productArtist = product.artist;
            item.productCategory = product.category;
            item.productSize = product.size;
            item.unitPrice = product.price;
            item.quantity = 1;

            this.order.items.push(item);

        }

    }
}