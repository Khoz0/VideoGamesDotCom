import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/types/game.type";
import {GamesService} from "../shared/services/games.service";
import {AuthentificationService} from "../shared/services/authentification.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {filter, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  private _games: Game[];
  private _admin: boolean;
  private _gameDialog: MatDialogRef<DialogComponent, Game> | undefined;

  constructor(private _gamesService: GamesService, private _authService: AuthentificationService, private _dialog: MatDialog) {
    this._games = [];
    this._admin = false;
  }

  ngOnInit(): void {
    this._gamesService
      .fetch()
      .subscribe({ next: (games: Game[]) => this._games = games });
  }

  get games() {
    return this._games
  }

  get admin() {
    return this._admin = this._authService.getPersonRole() === "Admin";
  }

  createGame() {
    this._gameDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    this._gameDialog.afterClosed().pipe(
      filter((game: Game | undefined) => !!game),
      mergeMap( (game: Game | undefined) => this._add(game))
    ).subscribe({
      next: () => location.reload(),
      error: (e) => console.log(e),
      })
  }

  private _add(game: Game | undefined): Observable<Game> {
    return this._gamesService.create(game as Game);
  }

}
