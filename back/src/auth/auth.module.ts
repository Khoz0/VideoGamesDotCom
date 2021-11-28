import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PeopleModule } from '../people/people.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    forwardRef(() => PeopleModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
