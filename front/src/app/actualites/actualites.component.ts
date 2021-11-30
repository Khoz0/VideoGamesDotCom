import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../shared/services/authentification.service";

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {

  constructor(private _authService: AuthentificationService) { }

  ngOnInit(): void {
  }

  get admin(): boolean {
    return this._authService.getPersonRole() == "Admin";
  }

}
