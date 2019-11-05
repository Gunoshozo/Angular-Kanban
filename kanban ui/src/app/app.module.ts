import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { kanbantable } from './components/table/kanbantable.component';
import { cardComponent } from './models/card.component';
import { login } from './components/login/login.component';
import { register } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { gameComponent } from './components/game';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    kanbantable,
    cardComponent,
    login,
    register,
    gameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
