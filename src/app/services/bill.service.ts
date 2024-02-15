import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  generateReport(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/bill/generateReport/`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getPDF(uuid: any): Observable<Blob> {
    const data = { uuid: uuid };
    return this.httpClient.post(`${this.apiUrl}/bill/getPdf`, data, { responseType: 'blob' });
  }

  getBills(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/bill/getBills/`);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/bill/delete/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
