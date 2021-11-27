import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {POSTS} from "../../data/posts";
import {Post} from "../types/post.type";
import {Discussion} from "../types/discussion.type";
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  private _id!: string;
  private _posts: Post[];
  private _postHided: boolean;
  private _form: FormGroup

  constructor(private _activatedRoute:ActivatedRoute) {
    this._posts = POSTS;
    this._postHided = true
    this._form = new FormGroup({
      message: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ])),
    })
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      // @ts-ignore
      this._id = params.get('id');
    });
  }

  get posts(): Post[] {
    return this._posts;
  }

  set posts(value: Post[]) {
    this._posts = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get postHided(): boolean {
    return this._postHided;
  }

  set postHided(value: boolean) {
    this._postHided = value;
  }

  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  postHide() {
    this.postHided = ! this.postHided;
  }

  postMessage(message: string): void {
    this._form.patchValue({
      message: ''
    })
    this._form.markAsUntouched()
    this._form.updateValueAndValidity()
    this.postHide()
    var date = new Date().toLocaleDateString("fr")
    let post: Post
    post = {
      id : String(this._posts.length),
      idDiscussion: this._id,
      author: "Khozo",
      text: message,
      creationDate: date
    }
    this._posts.push(post)
  }
}
