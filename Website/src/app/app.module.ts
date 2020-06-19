/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/* Services */
import { InterceptTokenService } from './intercept-token.service';

/* Libraries */
import { JwtModule } from "@auth0/angular-jwt";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr'
import { ContextMenuModule } from 'ngx-contextmenu';

/* Componenets */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';
import { AccountVerficationComponent } from './account-verfication/account-verfication.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { InfoViewComponent } from './info-view/info-view.component'


export function tokenGetter() {
  return localStorage.getItem('access_token');
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
    ProfileEditComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    LogoutComponent,
    ScheduleComponent,
    ForgotPasswordComponent,
    SecondaryNavbarComponent,
    AccountVerficationComponent,
    PasswordResetComponent,
    SearchFilterPipe,
    InfoViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT'
      }
    }),
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    })
  ],
  exports: [ScheduleComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
