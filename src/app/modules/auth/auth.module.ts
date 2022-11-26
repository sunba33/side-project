import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from '../logout/logout/logout.component';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
