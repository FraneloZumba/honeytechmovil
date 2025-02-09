import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { RegisterComponent } from './Views/register/register.component';
import { SelectorComponent } from './Views/selector/selector.component';
import { BoxInfoComponent } from './Views/box-info/box-info.component';
import { ConfigComponent } from './Views/config/config.component';
import { ChangePasswordComponent } from './Views/change-password/change-password.component';
import { SuscriptionsComponent } from './Views/suscriptions/suscriptions.component';
import { PremiumSusInterfaceComponent } from './Views/premium-sus-interface/premium-sus-interface.component';
import { FreeSusInterfaceComponent } from './Views/free-sus-interface/free-sus-interface.component';
import { TempInterfaceComponent } from './Views/temp-interface/temp-interface.component';
import { HumidityInterfaceComponent } from './Views/humidity-interface/humidity-interface.component';
import { WeightInterfaceComponent } from './Views/weight-interface/weight-interface.component';
import { CamInterfaceComponent } from './Views/cam-interface/cam-interface.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HumidityInterfaceComponent, WeightInterfaceComponent, CamInterfaceComponent, TempInterfaceComponent, PremiumSusInterfaceComponent, FreeSusInterfaceComponent, SuscriptionsComponent, ChangePasswordComponent, ConfigComponent, SelectorComponent, RegisterComponent, LoginComponent, BoxInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
