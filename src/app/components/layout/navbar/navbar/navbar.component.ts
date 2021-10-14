import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

interface Category{
  title: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Observable<Category[]>;

  constructor(private afs: AngularFirestore) { 
    this.categories = afs.collection<Category>('categories').valueChanges();
  }

  ngOnInit(): void {
  }

}
