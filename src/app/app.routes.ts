import { Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { SelectorComponent } from './Views/selector/selector.component';
import { BoxInfoComponent } from './Views/box-info/box-info.component';
import { ConfigComponent } from './Views/config/config.component';
import { AddBoxComponent } from './Views/addbox/addbox.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'selector', component: SelectorComponent },
  { path: 'box-info/:id', component: BoxInfoComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'addbox', component: AddBoxComponent },
];
