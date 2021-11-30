import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {
  catchError,
  defaultIfEmpty,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { GamesDao } from './dao/games.dao';
import { Game } from './schemas/game.schema';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly _gamesDao: GamesDao) {}

  create = (createGameDto: CreateGameDto): Observable<GameEntity> =>
    this._gamesDao.save(createGameDto).pipe(
      catchError((e) =>
        e.code === 1100
          ? throwError(
              () =>
                new ConflictException(
                  `Game with title '${createGameDto.title}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Game) => new GameEntity(_)),
    );

  findAll = (): Observable<GameEntity[] | void> =>
    this._gamesDao.find().pipe(
      filter((_: Game[]) => !!_),
      map((_: Game[]) => _.map((_: Game) => new GameEntity(_))),
      defaultIfEmpty(undefined),
    );

  findOne = (id: string): Observable<GameEntity> =>
    this._gamesDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Game) =>
        !!_
          ? of(new GameEntity(_))
          : throwError(
              () => new NotFoundException(`Game with id '${id}' not found`),
            ),
      ),
    );

  update = (id: string, updateGameDto: UpdateGameDto): Observable<GameEntity> =>
    this._gamesDao.findByIdAndUpdate(id, updateGameDto).pipe(
      catchError((e) =>
        e.code === 1100
          ? throwError(() => new UnprocessableEntityException(e.message))
          : throwError(
              () =>
                new ConflictException(
                  `Game with title '${updateGameDto.title}' already exists`,
                ),
            ),
      ),
      mergeMap((_: Game) =>
        !!_
          ? of(new GameEntity(_))
          : throwError(
              () => new NotFoundException(`Game with id '${id}' not found`),
            ),
      ),
    );

  remove = (id: string): Observable<void> =>
    this._gamesDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Game) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Game with id '${id}' not found`),
            ),
      ),
    );
}
