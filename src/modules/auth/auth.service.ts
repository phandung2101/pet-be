// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      // Kiểm tra trực tiếp (tạm thời để debug)
      if (pass === user.password) {
        const { password, ...result } = user;
        return result;
      }
      // Nếu muốn dùng bcrypt:
      // const isMatch = await bcrypt.compare(pass, user.password);
      // if (isMatch) {
      //   const { password, ...result } = user;
      //   return result;
      // }
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user.id,
      roles: user.roles 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles
      }
    };
  }
  
  // Helper để hash mật khẩu (sử dụng khi tạo người dùng mới)
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}