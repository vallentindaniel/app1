import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Observable<Product[]>;
  product!: Product;

  constructor(
    private afs: AngularFirestore,
  ) { 
      this.products = this.afs.collection<Product>("products").valueChanges();
    }

  getProduct(path: string){
    this.products.forEach(data => {
      data.forEach(product =>{
        if(product.path == path) this.product = product;
      });
    });
    return this.product;
  }

  getCurrentProduct(){
    return this.product;
  }

  getProductsWhereCategory(category_id: string){
    this.afs.collection<Product>("products", res => 
      res.where('category_id', '==', category_id)
    ).valueChanges();
    return this.product;
  }

  getProducts(){
    return this.products;
  }

  editProduct(id: string, product: Product){
    const prd = this.afs.doc<Product>('products/'+ id);
    prd.update(product); // update product
    prd.valueChanges().forEach(product =>{
      if(product)
        this.product =  new BehaviorSubject<Product>(product).value; // set product with new value
    });
  }

  deleteProduct(id: string){
    const prd = this.afs.doc<Product>('products/'+ id);
    prd.delete(); // delete product
  }

  deleteProducts(){
    this.afs.doc('products/').delete(); // delete all products
  }

}
