import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { BalancesComponent } from './balances/balances.component';
import { FormsModule } from '@angular/forms';
import { OpenOrdersComponent } from './open-orders/open-orders.component';


@NgModule({
  declarations: [
    ProfileComponent,
    BalancesComponent,
    OpenOrdersComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
