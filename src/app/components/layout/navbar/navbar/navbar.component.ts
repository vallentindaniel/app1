import { Component, OnInit } from '@angular/core';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';

interface Category{
  item: Observable<DocumentData[]>
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public categories: Category;

  constructor(firestore: Firestore) { 
    this.categories ={ 
      item: collectionData(collection(firestore, 'categories')) 
    };
  }

  ngOnInit(): void {
  }

}
