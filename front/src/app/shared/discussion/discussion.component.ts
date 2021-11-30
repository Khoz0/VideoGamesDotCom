import {Component, Input, OnInit} from '@angular/core';
import {Discussion} from "../types/discussion.type";
import {DISCUSSIONS} from "../../data/discussions";
import {POSTS} from "../../data/posts";
import {AuthentificationService} from "../services/authentification.service";
import {DiscussionsService} from "../services/discussions.service";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  private _changeText: boolean;
  private _currentDiscussion: Discussion;
  private _admin: boolean;

  constructor(private _authService: AuthentificationService, private _discussionService: DiscussionsService) {
    this._admin = false;
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

  get admin(): boolean {
    return this._authService.getPersonRole() == "Admin";
  }

  get changeText(): boolean {
    return this._changeText;
  }

  set changeText(value: boolean) {
    this._changeText = value;
  }

  deleteDiscussion() {
    if (this.currentDiscussion.id != null) {
      this._discussionService.deleteDiscussion(this.currentDiscussion.id)
      window.location.reload()
    }
  }
}
