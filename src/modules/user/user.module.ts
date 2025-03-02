// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService], // Export để AuthModule có thể sử dụng
})
export class UserModule {}