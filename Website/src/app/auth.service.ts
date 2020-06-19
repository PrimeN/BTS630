import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials, User } from './models';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private conn = "http://localhost:8080/"
  private conn = 'https://boiling-springs-32981.herokuapp.com/';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public readToken(): any {
    const token = localStorage.getItem('access_token');
    return this.jwtHelper.decodeToken(token);
  }


  //Returns a boolean based on the token
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // We can also use this.jwtHelper.isTokenExpired(token) to see if the token is expired
    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }


  //Posts user information to database
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.conn}register`, user);
  }


  //Logs user in & returns an observable
  login(user: Credentials): Observable<any> {
    // Attempt to login
    console.log("Attempting login");
    return this.http.post<any>(`${this.conn}login`, user).pipe(
      tap(credentials => {
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token', credentials.token);

      })
    );
  }


  //Checks if the email is verified from the token recieved
  isEmailVerified(): boolean {
    if (this.readToken().Verified) {
      return true;
    }
    return false;
  }


  //Logs user out of the account
  logout() {
    localStorage.removeItem('access_token');
  }



  accountVerification(token): Observable<boolean> {
    const url = `${this.conn}email_confirmation/${token}`;
    return this.http.get<boolean>(url);
  }


  resendEmail(): Observable<boolean> {
    const url = `${this.conn}resend_email_verification/${this.readToken()._id}`;
    console.log(url);
    return this.http.get<boolean>(url);
  }


  sendPassReset(email): Observable<boolean>{
    const url = `${this.conn}send_pass_reset/${email}`;
    return this.http.get<boolean>(url);
  }

  updateForgottenPassword(token, password1, password2): Observable<boolean>{
    var body = {
      password: password1,
      password_conf: password2
    }
    const url = `${this.conn}confirm_pass_reset/${token}`;
    return this.http.put<boolean>(url, body, httpOptions);
  }
}