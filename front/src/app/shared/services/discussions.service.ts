import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Discussion} from "../types/discussion.type";
import {DISCUSSIONS} from "../../data/discussions";

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor() { }


  getDiscussions() {
    return DISCUSSIONS;
  }

  public getDiscussion(id: string) {
    let discussions:Discussion[]=this.getDiscussions();
    return discussions.find(d => d.id==id);
  }
}
