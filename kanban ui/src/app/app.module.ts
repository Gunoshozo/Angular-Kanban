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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { specsDistribution } from './components/specsDistribution/specsDistrib.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { graph } from './components/graph/graph.component';
import { report } from './components/report';


@NgModule({
  declarations: [
    AppComponent,
    kanbantable,
    cardComponent,
    login,
    register,
    gameComponent,
    specsDistribution,
    MainmenuComponent,
    graph,
    report
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
