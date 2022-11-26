import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from '../../../core/models/auth.model';
import { login } from '../../../store/user/user.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private store: Store<{ user: UserModel }>) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      this.isLoggedIn = true;
      this.store.dispatch(login({ token }));
    }
    this.store.select('user').subscribe((user) => {
      if (user.token && user.token !== '') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }


}
