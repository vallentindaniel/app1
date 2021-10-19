import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  login(){
    this.user = this.form.value;
    this.auth.login(this.user);
    this.form.reset();
  }

  ngOnInit(): void {
    const passwordValidators = [Validators.minLength(3)];
    passwordValidators.push(Validators.required);

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', passwordValidators]
    });
  }

}
