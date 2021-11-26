import { Component, OnInit } from '@angular/core';
import {DISCUSSIONS} from "../../data/discussions";
import {Discussion} from "../types/discussion.type";
import {Post} from "../types/post.type";
import {POSTS} from "../../data/posts";

@Component({
  selector: 'app-discusion',
  templateUrl: './discusion.component.html',
  styleUrls: ['./discusion.component.css']
})
export class DiscusionComponent implements OnInit {

  private _posts: Post[];


  constructor() {
    this._posts = POSTS;
  }

  ngOnInit(): void {
  }

  get posts(): Post[] {
    return this._posts;
  }

  set posts(value: Post[]) {
    this._posts = value;
  }

  getId() {
    return "1";
  }
}
