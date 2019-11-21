import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { login } from './components/login';
import { register } from './components/register';
import { gameComponent } from './components/game';
import { MainmenuComponent } from './components/mainmenu';


const routes: Routes = [
  { path: 'game', component: gameComponent},
  { path: 'login', component: login },
  { path: 'register', component: register },
  { path: 'mainmenu', component: MainmenuComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
