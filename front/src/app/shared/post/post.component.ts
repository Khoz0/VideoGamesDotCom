import { Component, OnInit } from '@angular/core';
import {POSTS} from "../../data/posts";
import {Post} from "../types/post.type";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
