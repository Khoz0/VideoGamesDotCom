import { Component, OnInit } from '@angular/core';
import {PeopleService} from "../shared/services/people.service";
import {Person} from "../shared/types/person.type";

@Component({
  selector: 'app-interface-admin',
  templateUrl: './interface-admin.component.html',
  styleUrls: ['./interface-admin.component.css']
})
export class InterfaceAdminComponent implements OnInit {

  private _people: Person[]

  constructor(private _peopleService: PeopleService) {
    this._people = [] as Person[]
  }

  ngOnInit(): void {
    this._peopleService.fetch().subscribe({ next: (people: Person[]) => this._people = people })
  }

  get people(): Person[] {
    return this._people;
  }

  set people(value: Person[]) {
    this._people = value;
  }

  deleteUser(id: string | undefined) {
    if (id != null) {
      console.log("elo")
      this._peopleService.deleteUser(id)
    }
  }
}
