import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, map} from "rxjs/operators";
import {Game} from "../types/game.type";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private _searchOptions=[] as Game[]
  constructor(private _http: HttpClient) {
  }


  get searchOptions(): Game[] {
    return this._searchOptions;
  }


  set searchOptions(value: Game[]) {
    this._searchOptions = value;
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

  create(game: Game): Observable<any> {
    return this._http.post<Game>("http://localhost:3000/games", game);
  }

  update(id: string, game: Game): Observable<any> {
    return this._http.put("http://localhost:3000/games/"+id, game);
  }

  filteredOptions() {
    const filteredGames = [];
    let games = [] as Game[];
    this.fetch().subscribe(
      result => {
        games = result;
      }
    )

    for (let game of games) {
      for (let option of this._searchOptions) {
        if (option.title === game.title) {
          filteredGames.push(game);
        }
      }
    }
    return filteredGames;
  }

}
