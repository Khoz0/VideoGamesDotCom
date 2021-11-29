import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../shared/services/authentification.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../inscription/custom-validators";
import {catchError, map, tap} from "rxjs/operators";
import {from, of, throwError} from "rxjs";
import {PeopleService} from "../shared/services/people.service";
import {Person} from "../shared/types/person.type";

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  private _hide: boolean;
  private _hideRepeat: boolean;
  private _form: FormGroup;
  private _err: boolean
  private _person: Person;
  private _modify : boolean;

  constructor(private formBuilder: FormBuilder, private _authService: AuthentificationService, private _route: Router,
              private _peopleService: PeopleService) {
    this._person = {} as Person;
    this._modify = false;
    this._err = false;
    this._hide = true;
    this._hideRepeat = true;
    this._form = new FormGroup({
      pseudo: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      mail: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])),
      role: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(4)
      ])),
    });
    this.form.controls['pseudo'].disable();
    this.form.controls['mail'].disable();
    this.form.controls['role'].disable();
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

  get admin(): boolean {
    return this._authService.getPersonRole() == "Admin";
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  get modify() {
    return this._modify
  }

  get err() {
    return this._err;
  }

  ngOnInit(): void {
    this._peopleService.fetchOne(this._authService.getPersonId()).subscribe(
      {
        next: (person: Person) => this._person = person
      }
    )
    this.modify = false;
  }

  submit() {
    if ((this.form.controls['pseudo'].value !== this.person.pseudo ||
      this.form.controls['mail'].value !== this.person.mail || this.form.controls['role'].value !== this.person.role )
      && this.person.id && this.form.valid) {
        this._peopleService.update(this.person.id, this.form.value, this.form.controls['password'].value, this.form.controls["pseudo"].value)
          .subscribe()
        this._peopleService.fetchOne(this._authService.getPersonId()).subscribe(
        {
          next: (person: Person) => this._person = person
        }
      )
    }
    this.form.controls['password'].setValue("");
    this.modify = false;
  }

  get person() : Person {
    return this._person
  }

  set modify(val: boolean) {
    this._modify = val;
    if(!val) {
      this.form.controls['pseudo'].disable();
      this.form.controls['mail'].disable();
      this.form.controls['role'].disable();
    } else {
      this.form.controls['pseudo'].enable();
      this.form.controls['pseudo'].setValue(this.person.pseudo);
      this.form.controls['mail'].enable();
      this.form.controls['mail'].setValue(this.person.mail);
      this.form.controls['role'].setValue(this.person.role);
      if (this.admin) {
        this.form.controls['role'].enable();
      }
    }
  }


}
