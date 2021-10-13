import { Component, OnInit } from '@angular/core';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';

interface Product{
  title: string,
  item: Observable<DocumentData[]>
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  private category: any;

  constructor(private firestore: Firestore) { 
    const discounts = collection(firestore, 'products');
    const latest = collection(firestore, 'products');
    const nice = collection(firestore, 'products');

    this.products = [
      { title: "Discounts", item: collectionData(discounts) },
      { title: "Latest", item: collectionData(latest) },
      { title: "Maybe you like", item: collectionData(nice) }
    ];
  }

  ngOnInit(): void {
  }

}
