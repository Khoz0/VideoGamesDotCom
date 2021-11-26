import { Component, OnInit } from '@angular/core';
import {Discussion} from "../shared/types/discussion.type";
import {DISCUSSIONS} from "../data/discussions";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  private _changeText: boolean;
  private _discussions: Discussion[];

  constructor() {
    this._discussions = DISCUSSIONS;
    this._changeText = false;
  }

  ngOnInit(): void {
  }

  get changeText(): boolean {
    return this._changeText;
  }

  set changeText(value: boolean) {
    this._changeText = value;
  }

  get discussions(): Discussion[] {
    return this._discussions;
  }

  set discussions(value: Discussion[]) {
    this._discussions = value;
  }

}
