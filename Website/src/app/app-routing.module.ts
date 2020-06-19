import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { GuardAuthService } from './guard-auth.service';
import { LogoutComponent } from './logout/logout.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountVerficationComponent } from './account-verfication/account-verfication.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { InfoViewComponent } from './info-view/info-view.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [GuardAuthService] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [GuardAuthService] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [GuardAuthService] },
  { path: 'information', component: InfoViewComponent, canActivate: [GuardAuthService] },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'account_verification/:token', component: AccountVerficationComponent },
  { path: 'password_reset/:token', component: PasswordResetComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
