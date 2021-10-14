import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { isEmpty, map } from '@firebase/util';
import { Router } from '@angular/router';

export interface User{
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password_repeat: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  public first_name: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  register(){
    const email = "vallentindaniel0@gmail.com";
    const pass = "12345678";

    const user_id = this.afs.collection<User>("users", res => 
      res.where('email','==', this.form.get("email")?.value)
    ).valueChanges({ idField: 'docId' });
    
    user_id.forEach( data =>{
      if(isEmpty(data)){ // create user
        const new_user = this.afs.collection<User>("users");
         new_user.add(this.form.value);
         this.form.reset();
         this.router.navigate(['/login']);
      }else{ // user already exist
        this.form.reset();
        window.alert("user already exist");
      }
     
    });




  }
  
 

  ngOnInit(): void {
    const passwordValidators = [Validators.minLength(3)];
    passwordValidators.push(Validators.required);

    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', passwordValidators],
      password_repeat: ['', passwordValidators]
  });

  }

}
