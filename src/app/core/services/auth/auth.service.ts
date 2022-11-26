import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthModel, LoginResponseModel } from '../../models/auth.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(loginData: AuthModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${environment.apiUrl}/auth/login`, loginData);
  }
}
