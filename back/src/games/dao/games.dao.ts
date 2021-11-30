import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from '../schemas/game.schema';
import { defaultIfEmpty, filter, from, map, Observable } from 'rxjs';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';

@Injectable()
export class GamesDao {
  constructor(
    @InjectModel(Game.name)
    private readonly _GameModel: Model<GameDocument>,
  ) {}

  find = (): Observable<Game[] | void> =>
    from(this._GameModel.find({})).pipe(
      filter((docs: GameDocument[]) => !!docs && docs.length > 0),
      map((docs: GameDocument[]) => docs.map((_: GameDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  findById = (id: string): Observable<Game | void> =>
    from(this._GameModel.findById(id)).pipe(
      filter((doc: GameDocument) => !!doc),
      map((doc: GameDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  save = (Game: CreateGameDto): Observable<Game> =>
    from(new this._GameModel(Game).save()).pipe(
      map((doc: GameDocument) => doc.toJSON()),
    );

  findByIdAndRemove = (id: string): Observable<Game | void> =>
    from(this._GameModel.findByIdAndRemove(id)).pipe(
      filter((doc: GameDocument) => !!doc),
      map((doc: GameDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  findByIdAndUpdate = (
    id: string,
    Game: UpdateGameDto,
  ): Observable<Game | void> =>
    from(
      this._GameModel.findByIdAndUpdate(id, Game, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: GameDocument) => !!doc),
      map((doc: GameDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
