import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  private readonly URL = '/api/home';
  public makeRequest(auth: string):Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${auth}`);
    return this.httpClient.get(`${this.URL}`, { headers: headers, responseType: 'text'});
  }

}
