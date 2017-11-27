import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { ContactComponent } from './contact/index';
import { FitbitComponent } from './fitbit/index';
import { ActivityComponent } from './activity/index';
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contact' , component: ContactComponent},  
    { path: 'fitbit' , component: FitbitComponent},  
    { path: 'activity' , component: ActivityComponent},  

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);