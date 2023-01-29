import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./login.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "../home-page/home-page.component";

const routes: Routes = [
  { path: '', component: LoginComponent }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
