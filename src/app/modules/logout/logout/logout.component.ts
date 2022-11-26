import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.store.dispatch(logout());
  }

}
