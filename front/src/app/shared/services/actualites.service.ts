import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Actualites} from "../types/actualites.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActualitesService {

  constructor(private _http: HttpClient) { }


  getActualites(): Observable<Actualites[]> {
    return this._http.get<Actualites[]>("http://localhost:3000/actualites")
      .pipe(
        tap(_ => console.log('fetched actualites'))
      );
  }

  deleteActualites(id: string) {
    return this._http.delete<Actualites>('http://localhost:3000/actualites/:id'.replace(':id', id)).subscribe()
  }

  addActualites(actualites: Actualites) {
    return this._http.post<Actualites>('http://localhost:3000/actualites', actualites, ActualitesService._options()).subscribe()
  }

  private static _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
