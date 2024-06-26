import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, UsersModule, AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
