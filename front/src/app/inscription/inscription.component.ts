import { Component, OnInit } from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "./custom-validators";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private _hide: boolean;
  private _hideRepeat: boolean;
  private _form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._hide = true;
    this._hideRepeat = true;
    this._form = new FormGroup({
      pseudo: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])),
      repeatPassword: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(8), CustomValidators.mustMatch
      ]))
    });
  }

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  get hideRepeat(): boolean {
    return this._hideRepeat;
  }

  set hideRepeat(value: boolean) {
    this._hideRepeat = value;
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
