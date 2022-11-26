import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { MarketsModel } from '../../models/markets.model';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  constructor(private http: HttpClient) {
  }

  getMarkets(): Observable<MarketsModel[]> {
    return this.http.get<MarketsModel[]>(`${environment.apiUrl}/markets`)
  }

}
