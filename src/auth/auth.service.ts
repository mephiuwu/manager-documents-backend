import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Serialize user into session by saving only the user ID.
   * @param user - The user object to serialize.
   * @param done - Callback function to signal completion.
   */
  serializeUser(user: any, done: (err: any, id?: any) => void) {
    done(null, user.id); // Guarda solo el ID del usuario en sesión
  }

  /**
   * Deserialize user from session using the user ID.
   * @param userId - The ID of the user to deserialize.
   * @param done - Callback function to return the deserialized user.
   */
  async deserializeUser(userId: any, done: (err: any, user?: any) => void) {
    try {
      const user = await this.usersService.findById(userId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }

  /**
   * Validate user credentials by checking email and password.
   * @param email - The email address of the user.
   * @param password - The password to validate.
   * @returns A Promise resolving to the authenticated user, or null if not found or invalid.
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generate an access token for the authenticated user.
   * @param user - The authenticated user object.
   * @returns An object containing the access token.
   */
  async login(user: any) {
    const roleName = await this.usersService.findRoleNameById(user.roleId);
    const payload = { username: user.email, code: user.id, roleId: user.roleId, role: roleName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
