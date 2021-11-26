import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  private _hide: boolean;

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  constructor() {
    this._hide = true;
  }

  ngOnInit(): void {
  }

}
