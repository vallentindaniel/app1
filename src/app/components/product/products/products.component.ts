import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Product{
  category_id: string,
  title: string,
  description: string,
  path: string,
  price: number,
  quantity: number
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private afs: AngularFirestore) { 

    this.products = afs.collection<Product>('products').valueChanges();
    
  }

  ngOnInit(): void {
  }

}
