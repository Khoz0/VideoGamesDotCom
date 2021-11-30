import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/types/game.type";
import {GamesService} from "../shared/services/games.service";
import {ActivatedRoute, Router} from "@angular/router";
import {merge, Observable} from "rxjs";
import {filter, mergeMap, tap} from "rxjs/operators";
import {AuthentificationService} from "../shared/services/authentification.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  private _game: Game;
  private _admin: boolean;
  private _gameDialog: MatDialogRef<DialogComponent, Game> | undefined;

  constructor(private _gamesService: GamesService, private _route: ActivatedRoute, private _router: Router,
              private _authService: AuthentificationService, private _dialog: MatDialog) {
    this._game = {} as Game;
    this._admin = false;
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

  get admin() {
    return this._admin = this._authService.getPersonRole() === "Admin";
  }

  update() {
    this._gameDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: this.game,
    });

    this._gameDialog.afterClosed().pipe(
      filter((game: Game | undefined) => !!game),
      mergeMap( (game: Game | undefined) => this._update(this._game.id as string,game))
    ).subscribe({
      next: () => location.reload(),
      error: (e) => console.log(e),
    })
  }


private _update(id: string,game: Game | undefined): Observable<Game> {
  return this._gamesService.update(id, game as Game);
}

}
