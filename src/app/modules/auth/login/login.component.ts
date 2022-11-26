import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserModel } from '../../../core/models/auth.model';
import { login } from '../../../store/user/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  error = false;
  unSubscriber$ = new Subject();

  constructor(private authService: AuthService, private store: Store<{ user: UserModel }>, private router: Router) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      this.router.navigate(['/profile'])
      this.store.dispatch(login({ token }));
    }
    this.initForm();
  }


  initForm() {
    this.loginForm = new FormGroup({
      identifier: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onClickLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const formValues = this.loginForm.value;

    this.authService
      .login(formValues)
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((res) => {
        if (res.code === 0) {
          this.store.dispatch(login({ token: res.token }));
          localStorage.setItem('token', res.token);
          this.error = false;
          this.router.navigate(['/profile'])
        }
        this.error = true;
      }, (err) => {
        this.error = true;
      });
  }

  ngOnDestroy() {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }
}
