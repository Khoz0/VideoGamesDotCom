import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../types/person.type";
import {catchError, map, tap} from "rxjs/operators";
import {AuthentificationService, JWT_NAME} from "./authentification.service";

export interface LoginForm {
  pseudo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private _http: HttpClient, private _authService: AuthentificationService) {
  }

  fetchOne(id: string): Observable<Person> {
    return this._http.get<Person>("http://0.0.0.0:3000/people/"+id).pipe(
      map((_: Person) => {
        return _
      }),
    );
  }

  update(id: string, person:Person , password:string, pseudo: string) : Observable<any> {
    return this._http.put("http://0.0.0.0:3000/people/"+id, person).pipe(
      map(() => {
        this._authService.logout();
        this._authService.loginNoForm(pseudo, password).subscribe()
      })
    )

  }


}
