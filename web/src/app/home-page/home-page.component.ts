import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HomeService} from "./home.service";
import {iif, of} from "rxjs";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  message: string = "";
  error: string = "";

  session: boolean = false;

  constructor(private cookieService: CookieService,
              private router: Router,
              private homeService: HomeService,
              private loginService: LoginService) {

    const auth = this.cookieService.get("Auth");

    if(auth) {
      iif(() => this.session, of(''), loginService.verify(auth))
        .subscribe(valid => {
          if(!valid) {
            this.navigateToLogin();
          }
        });
    }
  }

  public solicitar() {
    let auth = this.getAuth();
    if(auth) {
      this.homeService.makeRequest(auth).subscribe(
        response => this.message = response
      , erro => this.error = erro.statusText);
    } else {
      this.navigateToLogin();
    }
  }

  private navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  private getAuth() {
    return this.cookieService.get('Auth');
  }

  public logOut() {
    this.cookieService.delete('Auth');
    this.navigateToLogin();
  }

}
