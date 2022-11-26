import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) },
  { path: 'logout', loadChildren: () => import('./modules/logout/logout.module').then((m) => m.LogoutModule) },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'markets',
    loadChildren: () => import('./modules/markets/markets.module').then((m) => m.MarketsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
