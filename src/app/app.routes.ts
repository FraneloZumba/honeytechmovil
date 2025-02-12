import { Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { SelectorComponent } from './Views/selector/selector.component';
import { BoxInfoComponent } from './Views/box-info/box-info.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'selector', component: SelectorComponent },
  { path: 'box-info/:id', component: BoxInfoComponent },
];
