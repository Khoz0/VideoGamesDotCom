import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _title = 'VideoGamesDotCom';
  private _isConnected = false;
  private _lightTheme = true;
  private _isDark = false;

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
    return this._isConnected;
  }

  set isConnected(value: boolean) {
    this._isConnected = value;
  }

  get lightTheme(): boolean {
    return this._lightTheme;
  }

  set lightTheme(value: boolean) {
    this._lightTheme = value;
  }

  deconnexion() {
    this.isConnected = false;
  }

  connexion() {
    this.isConnected = true;
  }
}
