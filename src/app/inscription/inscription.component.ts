import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private _hide: boolean;
  private _form: FormGroup;

  constructor() {
    this._hide = true;
    this._form = new FormGroup({
      nom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    })
  }

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

  ngOnInit(): void {
  }

}
