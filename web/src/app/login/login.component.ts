import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {iif, of, reduce} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form: FormGroup;
  private session: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private cookieService: CookieService,
              private router: Router) {

    const auth = this.cookieService.get("Auth");

    if(auth) {
      iif(() => this.session, of(''), loginService.verify(auth))
        .subscribe((value) => {
          if(value) {
            this.redirectToHome();
          }
        });
    }

    this.form = this.createForm();
  }

  public createForm() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login() {
    this.loginService.login(this.usernameByForm, this.passwordByForm)
      .subscribe(response => this.actionsByLogin(response));
  }

  private actionsByLogin(response: any) {
    this.form.reset();
    this.setAuthCookie(response);
    this.redirectToHome();
  }

  private setAuthCookie(response: any) {
    this.cookieService.set('Auth', response.token);
  }

  private redirectToHome() {
    this.router.navigateByUrl('/home');
  }

  get usernameByForm() {
    return this.form.get('username')?.value;
  }

  get passwordByForm() {
    return this.form.get('password')?.value;
  }

}
