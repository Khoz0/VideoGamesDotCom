import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../shared/services/authentification.service";
import {Actualites} from "../shared/types/actualites.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActualitesService} from "../shared/services/actualites.service";

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {

  private _actualites: Actualites[];
  private _actualitesHided: boolean;
  private _form: FormGroup

  constructor(private _authService: AuthentificationService, private _actualitesService: ActualitesService) {
    this._actualites = [] as Actualites[];
    this._actualitesHided = true;
    this._form = new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ])),
      text: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ]))
    })
  }

  ngOnInit(): void {
    this._actualitesService.getActualites().subscribe({ next: (actualites: Actualites[]) => this._actualites = actualites })
  }

  get admin(): boolean {
    return this._authService.getPersonRole() == "Admin";
  }

  get actualites(): Actualites[] {
    return this._actualites;
  }

  set actualites(value: Actualites[]) {
    this._actualites = value;
  }

  openActualite() {
    this.actualitesHided = ! this.actualitesHided;
  }

  get actualitesHided(): boolean {
    return this._actualitesHided;
  }

  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  set actualitesHided(value: boolean) {
    this._actualitesHided = value;
  }

  deletePost(id: string | undefined) {
    if (id != null) {
      this._actualitesService.deleteActualites(id)
      window.location.reload()
    }
  }

  createActualite(form: FormGroup) {
    let title = form.value.title
    let text = form.value.text
    this._form.patchValue({
      title: '',
      text: ''
    })
    this._form.markAsUntouched()
    this._form.updateValueAndValidity()
    this.openActualite()
    const date = new Date().toLocaleDateString("fr");
    let actualites: Actualites
    actualites = {
      title: title,
      text: text,
      creationDate: date,
      author: this._authService.getPersonPseudo(),
    }
    console.log("oyo")
    this._actualitesService.addActualites(actualites)
    window.location.reload()
  }
}
