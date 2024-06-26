import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: any, id?: any) => void): any {
    this.authService.serializeUser(user, done);
  }

  deserializeUser(userId: any, done: (err: any, user?: any) => void): any {
    this.authService.deserializeUser(userId, done);
  }
}
