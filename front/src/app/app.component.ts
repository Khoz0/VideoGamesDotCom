import {Component, HostBinding} from '@angular/core';
import {AuthentificationService} from "./shared/services/authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _title = 'VideoGamesDotCom';
  private _lightTheme = true;
  private _isDark = false;

  constructor(private _authService: AuthentificationService) {
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
