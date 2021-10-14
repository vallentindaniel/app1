import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

export interface User{
  first_name: string,
  last_name: string,
  email: string,
  password: string
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
    private formBuilder: FormBuilder
  ) { }

  register(){
    window.alert("hii");
    
  }

  ngOnInit(): void {
    const passwordValidators = [Validators.minLength(6)];
    passwordValidators.push(Validators.required);

    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', passwordValidators]
  });

  }

}
