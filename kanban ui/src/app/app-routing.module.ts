import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { login } from './components/login';
import { register } from './components/register';
import { gameComponent } from './components/game';
import { testpage } from './components/testpage/testpage';
import { MainmenuComponent } from './components/mainmenu';
import { LobbyComponent } from './components/lobby';
import { GamebrowserComponent } from './components/gamebrowser';


const routes: Routes = [
  { path: 'game', component: gameComponent},
  { path: 'login', component: login },
  { path: 'register', component: register },
  { path: 'test', component: testpage},
  { path: 'mainmenu', component: MainmenuComponent},
  { path: 'lobby', component: LobbyComponent},
  { path: 'browser', component: GamebrowserComponent},
  
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
