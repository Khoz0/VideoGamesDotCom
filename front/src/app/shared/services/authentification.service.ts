import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError, map, tap} from "rxjs/operators";
import {PersonModel} from "../model/person.model";


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
    )
  }
  loginNoForm(pseudo: string, password: string) {
    return this._http.post('http://0.0.0.0:3000/people/login', {pseudo: pseudo, password: password}, {responseType: 'text'}).pipe(
      map((token) => {
        localStorage.setItem(JWT_NAME, token)
        return token;
      })
    )
  }


  getPersonId() : string {
    return this._jwtHelper.decodeToken( localStorage.getItem(JWT_NAME) + "").person.id;
  }

  getPersonRole() : string {
    return  this._jwtHelper.decodeToken( localStorage.getItem(JWT_NAME) + "").person.role;
  }

  getPersonPseudo() : string {
    return  this._jwtHelper.decodeToken( localStorage.getItem(JWT_NAME) + "").person.pseudo;

  }

  getPersonMail() : string {
    return  this._jwtHelper.decodeToken( localStorage.getItem(JWT_NAME) + "").person.mail;

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
