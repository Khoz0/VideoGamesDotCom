import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PeopleService } from '../../people/people.service';
import { map, Observable } from 'rxjs';
import { Person } from '../../people/model/people.interface';
import { PersonEntity } from '../../people/entities/person.entity';

export class PersonGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => PeopleService))
    private _peopleService: PeopleService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const params = req.params;
    const person: Person = req.person;
    return this._peopleService.findOne(person.id).pipe(
      map((person: PersonEntity) => {
        let hasPerm = false;

        if (person.id === params.id) {
          hasPerm = true;
        }
        return person && hasPerm;
      }),
    );
  }
}
