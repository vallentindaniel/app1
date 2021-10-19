import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { isEmpty } from '@firebase/util';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/interfaces';

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

  isLoggedin: boolean;
  username: string | undefined;
  

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
    ) {
    this.isLoggedin = false; 
    this.categories = afs.collection<Category>('categories').valueChanges();

    const user = this.auth.getUser(); 
    if( user != null) {
      this.isLoggedin = true;
      this.username = user.first_name;
    }
  }

  logout(){
    this.auth.logout();
  }

  ngOnInit(): void {
  }

}
