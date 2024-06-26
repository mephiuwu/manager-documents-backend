import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
    });
  }

  async createUser(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({ data: user });
  }

  async deleteUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restoreUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email, deletedAt: null } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id, deletedAt: null } });
  }

  async findRoleNameById(roleId: number) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    return role ? role.name : null;
  }
}
