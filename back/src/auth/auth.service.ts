import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Person } from '../people/model/people.interface';
import { from, Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService) {}

  generateJWT(person: Person): Observable<string> {
    return from(this._jwtService.signAsync({ person } ));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(newPassword: string, passwortHash: string): Observable<any> {
    return from(bcrypt.compare(newPassword, passwortHash));
  }
}
