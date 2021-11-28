import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../shared/services/authentification-service";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {throwError} from "rxjs";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  private _hide: boolean;
  private _err : boolean;
  private _form: FormGroup

  constructor(private _authService: AuthentificationService, private _route: Router) {
    this._hide = true;
    this._err = false;
    this._form = new FormGroup({
      pseudo: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(8)
      ]))
    })
  };

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  get err() {
    return this._err;
  }

  submit() {
    if(this.form.invalid) {
      return;
    }
    this._authService.login(this.form.value).pipe(
      map(token => this._route.navigate(['/home'])),
      catchError((e) => {
        this._err = true;
        return throwError(e)
      }
    ),
    ).subscribe()
  }

  ngOnInit(): void {
  }
}
