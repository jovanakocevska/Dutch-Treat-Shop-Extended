import { Component, OnInit } from "@angular/core";
import { Store } from "../service/store.service";

@Component({
    selector: "product-list",
    templateUrl: "productListView.component.html",
    styleUrls: ["productListView.component.css"]
})

export class ProductListView implements OnInit {

    public products: any;

    constructor(public store: Store) {
    }

    ngOnInit(): void {
        this.store.loadProducts()
            .subscribe() as any;
    }
}