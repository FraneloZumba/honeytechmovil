import { Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { SelectorComponent } from './Views/selector/selector.component';
import { BoxInfoComponent } from './Views/box-info/box-info.component';
import { ConfigComponent } from './Views/config/config.component';
import { AddBoxComponent } from './Views/addbox/addbox.component';
import { ChangePasswordComponent} from './Views/change-password/change-password.component';
import { CamInterfaceComponent} from './Views/cam-interface/cam-interface.component';
import { HumidityInterfaceComponent } from './Views/humidity-interface/humidity-interface.component';
import { TempInterfaceComponent } from './Views/temp-interface/temp-interface.component';
import { WeightInterfaceComponent } from './Views/weight-interface/weight-interface.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'selector', component: SelectorComponent },
  { path: 'box-info/:nombre', component: BoxInfoComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'addbox', component: AddBoxComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'cam-interface/:nombre', component: CamInterfaceComponent},
  { path: 'humidity-interface/:nombre', component: HumidityInterfaceComponent },
  { path: 'temp-interface/:nombre', component: TempInterfaceComponent },
  { path: 'weight-interface/:nombre', component: WeightInterfaceComponent },
];
