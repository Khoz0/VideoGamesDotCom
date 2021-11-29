import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/types/game.type";
import {GamesService} from "../shared/services/games.service";
import {ActivatedRoute, Router} from "@angular/router";
import {merge} from "rxjs";
import {filter, mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  private _game: Game;

  constructor(private _gamesService: GamesService, private _route: ActivatedRoute, private _router: Router) {
    this._game = {} as Game;
  }

  ngOnInit(): void {
    this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._gamesService.fetchOne(params.id))
      ).subscribe({
        next: (game: Game) => this._game = game,
        error: () => {
          this._router.navigate(['/not-found'])
        }
      });
  }

  get game() {
    return this._game;
  }

}
