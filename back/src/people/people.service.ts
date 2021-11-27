import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
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
import { PersonEntity } from './entities/person.entity';
import { PeopleDao } from './dao/people.dao';
import { Person } from './schemas/person.schema';

@Injectable()
export class PeopleService {
  constructor(private readonly _peopleDao: PeopleDao) {}

  create = (createPersonDto: CreatePersonDto): Observable<PersonEntity> =>
    this._peopleDao.save(createPersonDto).pipe(
      catchError((e) =>
        e.code === 1100
          ? throwError(() => new UnprocessableEntityException(e.message))
          : throwError(
              () =>
                new ConflictException(
                  `People with pseudo '${createPersonDto.pseudo}' or mail '${createPersonDto.mail}' already exists`,
                ),
            ),
      ),
      map((_: Person) => new PersonEntity(_)),
    );

  findAll = (): Observable<PersonEntity[] | void> =>
    this._peopleDao.find().pipe(
      filter((_: Person[]) => !!_),
      map((_: Person[]) => _.map((_: Person) => new PersonEntity(_))),
      defaultIfEmpty(undefined),
    );

  findOne = (id: string): Observable<PersonEntity> =>
    this._peopleDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Person) =>
        !!_
          ? of(new PersonEntity(_))
          : throwError(
              () => new NotFoundException(`Person with id '${id}' not found`),
            ),
      ),
    );

  findOnePseudo = (pseudo: string): Observable<PersonEntity> =>
    this._peopleDao.findByPseudo(pseudo).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Person) =>
        !!_
          ? of(new PersonEntity(_))
          : throwError(
              () =>
                new NotFoundException(
                  `Person with pseudo '${pseudo}' not found`,
                ),
            ),
      ),
    );

  update = (
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Observable<PersonEntity> =>
    this._peopleDao.findByIdAndUpdate(id, updatePersonDto).pipe(
      catchError((e) =>
        e.code === 1100
          ? throwError(() => new UnprocessableEntityException(e.message))
          : throwError(
              () =>
                new ConflictException(
                  `People with pseudo '${updatePersonDto.pseudo}' or mail '${updatePersonDto.mail}' already exists`,
                ),
            ),
      ),
      mergeMap((_: Person) =>
        !!_
          ? of(new PersonEntity(_))
          : throwError(
              () => new NotFoundException(`People with id '${id}' not found`),
            ),
      ),
    );

  remove = (id: string): Observable<void> =>
    this._peopleDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Person) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Person with id '${id}' not found`),
            ),
      ),
    );
}
