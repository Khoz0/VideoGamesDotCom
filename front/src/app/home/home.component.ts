import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/types/game.type";
import {GamesService} from "../shared/services/games.service";
import {AuthentificationService} from "../shared/services/authentification.service";
import {Discussion} from "../shared/types/discussion.type";
import {Actualites} from "../shared/types/actualites.type";
import {DiscussionsService} from "../shared/services/discussions.service";
import {ActualitesService} from "../shared/services/actualites.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  private _games: Game[];
  private _discussions: Discussion[];
  private _actualites: Actualites[];

  constructor(private _gamesService: GamesService, private _authService: AuthentificationService,
              private _discussionsService: DiscussionsService, private _actualitesService: ActualitesService) {
    this._games = [];
    this._discussions = [];
    this._actualites = [];
  }

  ngOnInit(): void {
    this._gamesService
      .fetch()
      .subscribe({ next: (games: Game[]) => this._games = games });

    this._discussionsService
      .getDiscussions()
      .subscribe({ next: (discussions: Discussion[]) => this._discussions = discussions });

    this._actualitesService
      .getActualites()
      .subscribe({ next: (actualites: Actualites[]) => this._actualites = actualites });
  }

  get games() {
    return this._games
  }

  get discussions() {
    return this._discussions
  }

  get actualites() {
    return this._actualites
  }



}
