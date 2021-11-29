import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/types/game.type";
import {GamesService} from "../shared/services/games.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  private _games: Game[];

  constructor(private _gamesService: GamesService) {
    this._games = [];
  }

  ngOnInit(): void {
    this._gamesService
      .fetch()
      .subscribe({ next: (games: Game[]) => this._games = games });
  }

  get games() {
    return this._games
  }

}
