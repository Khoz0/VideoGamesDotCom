import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, map} from "rxjs/operators";
import {Game} from "../types/game.type";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private _http: HttpClient) {
  }

  fetch(): Observable<Game[]> {
    return this._http.get<Game[]>("http://localhost:3000/games").pipe(
      filter((games:Game[]) => !!games),
      defaultIfEmpty([{}])
    );
  }

  fetchOne(id: string): Observable<Game> {
    return this._http.get<Game>("http://localhost:3000/games/"+id)
  }
}
