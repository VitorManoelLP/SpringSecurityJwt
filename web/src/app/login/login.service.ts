import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private readonly URL = '/api/auth';

  public login(username: string, password: string):Observable<any> {
    const userObject = { username: username, password: password };
    return this.httpClient.post(`${this.URL}/login`, userObject);
  }

  public verify(token: string): Observable<any> {
    return this.httpClient.post(`${this.URL}/verify`, { token: token });
  }

}
