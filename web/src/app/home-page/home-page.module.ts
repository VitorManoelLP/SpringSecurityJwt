import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./home-page.component";
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  { path: '', component: HomePageComponent }
]

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomePageModule { }
