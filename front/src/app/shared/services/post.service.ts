import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Post} from "../types/post.type";
import {Discussion} from "../types/discussion.type";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this._http.get<Post[]>("http://localhost:3000/post")
      .pipe(
        tap(_ => console.log('fetched posts'))
      );
  }

  getPostsByIdDiscussion(id: string): Observable<Post[]> {
    return this._http.get<Post[]>("http://localhost:3000/post")
      .pipe(
        tap(_ => console.log('fetched posts'))
      );
  }

  addPost(post: Post) {
    return this._http.post<Post>('http://localhost:3000/post', post, PostService._options()).subscribe()
  }

  private static _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }

  deletePost(idPost: string) {
    return this._http.delete<Post>('http://localhost:3000/post/:id'.replace(':id', idPost)).subscribe()
  }
}
