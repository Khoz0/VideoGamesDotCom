import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Logger,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PeopleService } from '../../people/people.service';
import { Person } from '../../people/model/people.interface';
import { PersonEntity } from '../../people/entities/person.entity';

export class RolesGuard implements CanActivate {
  constructor(
    private _reflect: Reflector,
    @Inject(forwardRef(() => PeopleService))
    private _peopleService: PeopleService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflect.get<string[]>('roles', context.getHandler);
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const person: Person = req.person;
    return this._peopleService.findOne(person.id).pipe(
      map((person: PersonEntity) => {
        const hasRole = () => roles.indexOf(person.role) > -1;
        let hasPerm = false;

        if (hasRole()) {
          hasPerm = true;
        }
        return person && hasPerm;
      }),
    );
  }
}
