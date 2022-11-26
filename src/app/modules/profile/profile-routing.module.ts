import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { BalancesComponent } from './balances/balances.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'bakiyeler', component: BalancesComponent },
  { path: 'acik-emirler', component: OpenOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
