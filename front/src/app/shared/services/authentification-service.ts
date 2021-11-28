import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import jwtDecode from "jwt-decode";
import {catchError, map, tap} from "rxjs/operators";
import {PersonModel} from "../model/person.model.";
import {throwError} from "rxjs";


export interface LoginForm {
  pseudo: string;
  password: string;
}

export const JWT_NAME = 'person_token';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService{

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {
  }

  login(loginForm: LoginForm) {
   return this._http.post('http://0.0.0.0:3000/people/login', {pseudo: loginForm.pseudo, password: loginForm.password}, {responseType: 'text'}).pipe(
       map((token) => {
         localStorage.setItem(JWT_NAME, token)
         return token;
       })

     /*
     .pipe(
      map((token) => {
        console.log("TEST")
        console.log('token');
        localStorage.setItem(JWT_NAME, token.access_token)
        return token;
      })
    ) */)
  }


  getPersonId() {
    var test = localStorage.getItem(JWT_NAME) + "";
    var token = jwtDecode(test)
    console.log(token)
  }

  register(person: PersonModel) {
    return this._http.post<any>('http://0.0.0.0:3000/people', person).pipe(
      tap(person => console.log(person)),
      map(person => person)
    )
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    if (token) {
      return !this._jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }


}
