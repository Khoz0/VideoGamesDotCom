import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {Game} from "../types/game.type";
import {GamesService} from "../services/games.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private _formControl : FormControl;
  private _filteredOptions: Observable<string[]>;
  private _allGames: Game[];
  private _autoCompleteList: any[];
  private _options: Game[]


  @Output() onSelectedOption = new EventEmitter();
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;

  constructor(private _gamesService: GamesService) {
    this._formControl = new FormControl();
    this._filteredOptions = {} as Observable<string[]>;
    this._allGames = [];
    this._autoCompleteList = [];
    this.autocompleteInput = {} as ElementRef;
    this._options = this._gamesService.searchOptions;
  }

  get options(): Game[] {
    return this._options = this._gamesService.searchOptions;
  }

  get formControl(): FormControl {
    return this._formControl;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get allGames(): Game[] {
    return this._allGames;
  }

  get autoCompleteList(): any[] {
    return this._autoCompleteList;
  }

  ngOnInit(): void {
    this._gamesService.fetch().subscribe(
      results => {
        if (results != undefined) {
          this._allGames = results
        }
      }
    )

    this._formControl.valueChanges.subscribe(
      results => { this.autoCompleteExpenseList(results)}
    )
  }

  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input)
    this._autoCompleteList = categoryList;
  }

  filterCategoryList(val: any) {
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    let test = val ? this.allGames.filter(res => res.title !== undefined).filter(resGood => resGood.title?.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allGames;

    return test
  }

  displayFn(game: Game) {
      let k = game ? game.title : game;
      return k+"";
  }

  filterGameList(event: any) {
    var games= event.source.value;
    if(!games) {
      this._gamesService.searchOptions=[]
    }
    else {

      this._gamesService.searchOptions.push(games);
      this.onSelectedOption.emit(this._gamesService.searchOptions)
    }

    this.focusOnPlaceInput();
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

}
