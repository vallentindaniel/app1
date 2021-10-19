import { Injectable } from '@angular/core';

import { User } from 'src/app/interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { isEmpty, map } from '@firebase/util';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser!: BehaviorSubject<User>;

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
    const userSubject = localStorage.getItem('user');
    if(userSubject)
      this.currentUser = new BehaviorSubject<User>(JSON.parse(userSubject));
      //console.log(this.currentUser.value.last_name);
  }
  
  getUser(){
    //console.log(this.currentUser.value.first_name);
      return isEmpty(this.currentUser.value) === undefined ? null : this.currentUser.value;
  }

  async register(user: User) {
    if (user.password == user.password_repeat) {
      const user_id = this.afs.collection<User>("users", res =>
        res.where('email', '==', user.email)
      ).valueChanges();

      user_id.forEach(data => {

        if (isEmpty(data)) { // create user
          const new_user = this.afs.collection<User>("users");
          new_user.add(user);
          window.alert("user saved");
        } else {
          window.alert("user already exist");
        }

      });
    }

  }

  login(user: User) {
    const user_id = this.afs.collection<User>("users", res =>
      res.where('email', '==', user.email).where('password', "==", user.password)
    ).valueChanges();

    user_id.forEach(data => {
      //console.log(data[0]);
      if (isEmpty(data)) { // user not found
        window.alert("user not found or password is wrong");
      }else{ // connect user
        localStorage.setItem('user',JSON.stringify(data[0]));
        this.router.navigate(['/']);
      }
    });
  }

  logout() {
    localStorage.setItem('user',JSON.stringify({}));
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
