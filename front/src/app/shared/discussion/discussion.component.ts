import {Component, Input, OnInit} from '@angular/core';
import {Discussion} from "../types/discussion.type";
import {DISCUSSIONS} from "../../data/discussions";
import {POSTS} from "../../data/posts";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  private _changeText: boolean;
  private _currentDiscussion: Discussion;

  constructor() {
    this._changeText = false;
    this._currentDiscussion = {} as Discussion;
  }

  ngOnInit(): void {
  }

  get currentDiscussion(): Discussion {
    return this._currentDiscussion;
  }

  @Input()
  set currentDiscussion(value: Discussion) {
    this._currentDiscussion = value;
  }

  get changeText(): boolean {
    return this._changeText;
  }

  set changeText(value: boolean) {
    this._changeText = value;
  }

  deleteDiscussion() {
    DISCUSSIONS.splice(DISCUSSIONS.findIndex(discussion => discussion.id === this.currentDiscussion.id), 1)
    // TODO : retirer discussion de la db une fois le lien fonctionnel
  }
}
