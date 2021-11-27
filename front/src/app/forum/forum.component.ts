import { Component, OnInit } from '@angular/core';
import {Discussion} from "../shared/types/discussion.type";
import {DISCUSSIONS} from "../data/discussions";
import {DiscussionsService} from "../shared/services/discussions.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  private _discussions: Discussion[];

  constructor(private _discussionsService: DiscussionsService) {
    this._discussions = [] as Discussion[];
  }

  ngOnInit(): void {
    this._discussions = this._discussionsService.getDiscussions()
  }

  get discussions(): Discussion[] {
    return this._discussions;
  }

  set discussions(value: Discussion[]) {
    this._discussions = value;
  }

}
