import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User, Role, Class } from "./models";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private conn = 'https://boiling-springs-32981.herokuapp.com/';
  //private conn = "http://localhost:8080/"


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  /** GET all Users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.conn}users`)
      .pipe(    //Pipes link operators together & takes multiple functions and combines them into 1
        tap(users => this.log(`fetched Users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUser(_id: string): Observable<User> {
    const url = `${this.conn}user/${_id}`;
    console.log(url);
    return this.http.get<User>(url)
      .pipe(
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} user id=${_id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${_id}`))
      );
  }


  isAdmin(_id: string): Observable<boolean> {
    const url = `${this.conn}user/isAdmin/${_id}`;
    return this.http.get<boolean>(url);
  }

  /* GET Users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.conn}users/?FirstName=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    const url = `${this.conn}user/${user._id}`;
    return this.http.put((url), user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }


  /** DELETE: delete the employee from the server */
  deleteUser(user: User | string): Observable<User> {
    const id = typeof user == 'string' ? user : user._id;
    const url = `${this.conn}user/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }


  /** GET all Roles from the server */
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.conn}roles`)
      .pipe(
        tap(employees => this.log(`fetched Roles`)),
        catchError(this.handleError('getRoles', []))
      );
  }

  /** GET all Classes from the server */
  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.conn}classes`);
  }


  getClassesForUser(id: string): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.conn}classes/${id}`);
  }

  createClass(newClass: Class): Observable<Class> {
    return this.http.post<Class>(`${this.conn}createClass`, newClass);
  }

  updateClass(updatedClass: Class): Observable<any> {
    const url = `${this.conn}class/${updatedClass._id}`;
    return this.http.put(url, updatedClass, httpOptions).pipe(
      tap(_ => this.log(`updated class id=${updatedClass._id}`)),
      catchError(this.handleError<any>('updateClass'))
    );
  }


  updateUserContact(updatedContact: User): Observable<any> {
    console.log(updatedContact._id);
    const url = `${this.conn}user/contact/${updatedContact._id}`;
    return this.http.put(url, updatedContact, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${updatedContact._id}`)),
      catchError(this.handleError<any>('updateusercontact'))
    );
  }

  updateClassTime(updatedData): Observable<boolean> {
    const url = `${this.conn}classTimeUpdate/${updatedData._id}`;
    return this.http.put<boolean>(url, updatedData, httpOptions);
  }


  deleteClass(id: string): Observable<any> {
    const url = `${this.conn}class/${id}`;
    return this.http.delete<any>(url);
  }


  getClassById(_id: string): Observable<Class> {
    const url = `${this.conn}class/${_id}`;
    return this.http.get<Class>(url)
      .pipe(
        map(classes => classes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} class id=${_id}`);
        }),
        catchError(this.handleError<Class>(`getUser id=${_id}`))
      );
  }



  updatePassword(_id: string, password1: string, password2: string): Observable<boolean> {
    const url = `${this.conn}user/pass_reset/${_id}`;
    var body = {
      password: password1,
      password_conf: password2
    }
    return this.http.put(url, body, httpOptions).pipe(
      tap(_ => this.log(`password updated for user id=${_id}`)),
      catchError(this.handleError<any>('updatePassword'))
    );
  }




  //return this.http.put((url), user, httpOptions)
  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DataManagerService message with the MessageService */
  private log(message: string) {
    console.log('DataManager: ' + message);
  }

  viewLog(message: string) {
    console.log('View: ' + message);
  }

}


