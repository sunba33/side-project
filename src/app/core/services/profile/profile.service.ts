import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BalancesResponseModel, OpenOrdersResponseModel, ProfileResponseModel } from '../../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<ProfileResponseModel> {
    return this.http.post<ProfileResponseModel>(`${environment.apiUrl}/auth/me`, '');
  }
  getBalances(): Observable<BalancesResponseModel> {
    return this.http.post<BalancesResponseModel>(`${environment.apiUrl}/auth/balances`, '');
  }

  getOpenOrders(): Observable<OpenOrdersResponseModel> {
    return this.http.post<OpenOrdersResponseModel>(`${environment.apiUrl}/auth/open-orders`, '');
  }
}
