import {Component, EventEmitter, HostBinding, OnInit} from '@angular/core';
import {AuthentificationService} from "./shared/services/authentification.service";
import {GamesService} from "./shared/services/games.service";
import {Game} from "./shared/types/game.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private _title = 'VideoGamesDotCom';
  private _lightTheme = true;
  private _isDark = false;
  private _games : Game[];

  constructor(private _authService: AuthentificationService, private _gamesService: GamesService) {
    this._games = []
  }

  ngOnInit() {
    this._gamesService.fetch().subscribe(result => {
      this._games = result;
    });
  }

  onSelectedOption(event: EventEmitter<any>) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this._gamesService.searchOptions.length > 0)
      this._games = this._gamesService.filteredOptions();
    else {
      this._gamesService.fetch().subscribe(
        result => {this._games = result}
      );
    }

  }

  get games(): Game[] {
    return this._games;
  }

  @HostBinding('class')
  get themeMode(){
    return this._isDark ? 'theme-dark' : 'theme-light';
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get isConnected(): boolean {
    return this._authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this._authService.getPersonRole() === "Admin" ;
  }


  get lightTheme(): boolean {
    return this._lightTheme;
  }

  set lightTheme(value: boolean) {
    this._lightTheme = value;
  }

  deconnexion() {
    this._authService.logout();
    this.isConnected
    this.isAdmin
  }

  connexion() {
  }
}
