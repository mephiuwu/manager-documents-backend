import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    getUsers() {
        return this.prisma.user.findMany();
    }

    async createUser(user: CreateUserDto) {
        user.password = await bcrypt.hash(user.password, 10);
        return this.prisma.user.create({data: user});
    }
}
