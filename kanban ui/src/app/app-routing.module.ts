import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { login } from './components/login';
import { register } from './components/register';
import { gameComponent } from './components/game';
import { MainmenuComponent } from './components/mainmenu';
import { graph } from './components/graph/graph.component';
import { report } from './components/report';


const routes: Routes = [
  { path: 'game', component: gameComponent},
  { path: 'login', component: login },
  { path: 'register', component: register },
  { path: 'mainmenu', component: MainmenuComponent},
  {path: 'graph', component:graph},
  {path: 'report', component:report},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
