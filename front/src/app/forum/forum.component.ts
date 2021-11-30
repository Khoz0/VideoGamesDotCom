import { Component, OnInit } from '@angular/core';
import {Discussion} from "../shared/types/discussion.type";
import {DiscussionsService} from "../shared/services/discussions.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthentificationService} from "../shared/services/authentification.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  private _discussions: Discussion[];
  private _discussionHided: boolean;
  private _form: FormGroup

  constructor(private _discussionsService: DiscussionsService, private _http: HttpClient, private _authService: AuthentificationService) {
    this._discussions = [] as Discussion[];
    this._discussionHided = true
    this._form = new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ])),
    })
  }

  ngOnInit(): void {
    this._discussionsService.getDiscussions().subscribe({ next: (discussion: Discussion[]) => this._discussions = discussion })
  }

  get discussions(): Discussion[] {
    return this._discussions;
  }

  set discussions(value: Discussion[]) {
    this._discussions = value;
  }

  get discussionHided(): boolean {
    return this._discussionHided;
  }

  set discussionHided(value: boolean) {
    this._discussionHided = value;
  }

  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  openDiscussion() {
    this.discussionHided = ! this.discussionHided;
  }

  createDiscussion(title: string) {
    this._form.patchValue({
      title: ''
    })
    this._form.markAsUntouched()
    this._form.updateValueAndValidity()
    this.openDiscussion()
    const date = new Date().toLocaleDateString("fr");
    let discussion: Discussion
    discussion = {
      title: title,
      creationDate: date,
      author: this._authService.getPersonPseudo(),
      responses: 0
    }
    this._discussionsService.addDiscussion(discussion)
    window.location.reload()
  }
}
