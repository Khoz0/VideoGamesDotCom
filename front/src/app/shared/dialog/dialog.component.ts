import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Game} from "../types/game.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
  ]
})
export class DialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DialogComponent, Game>, @Optional() @Inject(MAT_DIALOG_DATA) private _game: Game) { }

  ngOnInit(): void {
  }

  get game() {
    return this._game
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel(): void {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(game: Game): void {
    this._dialogRef.close(game);
  }

}
