import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {DiscussionModel} from "../model/discussion.model";
import {Observable} from "rxjs";
import {Discussion} from "../types/discussion.type";

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private _http: HttpClient) { }

  addDiscussion(discussion: Discussion) {
    return this._http.post<Discussion>('http://localhost:3000/discussions', discussion, DiscussionsService._options()).subscribe()
  }

  getDiscussions(): Observable<Discussion[]> {
    return this._http.get<Discussion[]>("http://localhost:3000/discussions")
      .pipe(
        tap(_ => console.log('fetched discussions'))
      );
  }

  getDiscussion(idDiscussion: string): Observable<Discussion> {
    return this._http.get<Discussion>('http://localhost:3000/discussions/:id'.replace(':id', idDiscussion));
  }

  private static _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }

  deleteDiscussion(idDiscussion: string) {
    return this._http.delete<Discussion>('http://localhost:3000/discussions/:id'.replace(':id', idDiscussion)).subscribe()
  }

  updateDiscussionsAdd(idDiscussion: string) {
    let discussion:Discussion = {} as Discussion
    this.getDiscussion(idDiscussion).subscribe(res => {
      discussion = {
        title: res.title,
        creationDate: res.creationDate,
        author: res.author,
        responses: res.responses+1
      }
      console.log("")
      return this._http.put<Discussion>('http://localhost:3000/discussions/:id'.replace(':id', idDiscussion), discussion, DiscussionsService._options()).subscribe()
    })

  }

  updateDiscussionsDelete(idDiscussion: string) {
    let discussion:Discussion = {} as Discussion
    this.getDiscussion(idDiscussion).subscribe(res => {
      discussion = {
        title: res.title,
        creationDate: res.creationDate,
        author: res.author,
        responses: res.responses-1
      }
      console.log("")
      return this._http.put<Discussion>('http://localhost:3000/discussions/:id'.replace(':id', idDiscussion), discussion, DiscussionsService._options()).subscribe()
    })
  }
}
