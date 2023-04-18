import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  addApi(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/api', data);
  }

  updateApi(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/api/${id}`, data);
  }

  getApiList(): Observable<any> {
    return this._http.get('http://localhost:3000/api');
  }

  deleteApi(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/api/${id}`);
  }
}