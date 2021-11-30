import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Discussion} from "../types/discussion.type";
import {tap} from "rxjs/operators";
import {Post} from "../types/post.type";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this._http.get<Post[]>("http://localhost:3000/posts")
      .pipe(
        tap(_ => console.log('fetched posts'))
      );
  }

  getPostsByIdDiscussion(id: string): Observable<Post[]> {
    return this._http.get<Post[]>("http://localhost:3000/posts")
      .pipe(
        tap(_ => console.log('fetched posts'))
      );
  }
}
