import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Game} from "../types/game.type";

@Component({
  selector: 'app-form-games',
  templateUrl: './form-games.component.html',
  styleUrls: ['./form-games.component.css'
  ]
})
export class FormGamesComponent implements OnInit {
  private _form : FormGroup
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Game>;

  private _model: Game;
  private _isUpdateMode: boolean;

  constructor() {
    this._model = {} as Game;
    this._isUpdateMode = false;
    this._submit$ = new EventEmitter<Game>();
    this._cancel$ = new EventEmitter<void>();
    this._form = new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      synopsis: new FormControl('', Validators.compose([
        Validators.required
      ])),
      note: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      image: new FormControl('', Validators.compose([
        Validators.required
      ])),
      test: new FormControl('', Validators.compose([Validators.required
      ])),
      platform: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Game) {
    this._model = model;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Game> {
    return this._submit$;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        title: '',
        synopsis: '',
        note: 0,
        image: '',
        test: '',
        platform: ''
      };
      this._isUpdateMode = false;
    }
    // update form's values with model
    this._form.patchValue(this._model);
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(game: Game): void {
    this._submit$.emit(game);
  }

  ngOnInit(): void {
  }

  get form() {
    return this._form
  }

}
