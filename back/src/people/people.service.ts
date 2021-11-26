import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {catchError, defaultIfEmpty, filter, map, mergeMap, Observable, of, throwError} from "rxjs";
import {PersonEntity} from "./entities/person.entity";
import {PeopleDao} from "./dao/people.dao";
import {Person} from "./schemas/person.schema";

@Injectable()
export class PeopleService {

  constructor(private readonly _peopleDao: PeopleDao) {
  }

  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  findAll = (): Observable<PersonEntity[] | void> =>
    this._peopleDao.find().pipe(
        filter((_:Person[]) => !!_),
        map((_: Person[]) => _.map((_: Person) => new PersonEntity(_))),
        defaultIfEmpty(undefined),
    )


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

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
