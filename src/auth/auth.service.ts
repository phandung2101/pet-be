// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    
    if (!user) {
      return null;
    }
    
    // Kiểm tra mật khẩu với bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      // Không trả về password
      const { password, ...result } = user.toObject();
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    // Tạo payload cho JWT
    const payload = { 
      sub: user._id,
      username: user.username,
      roles: user.roles 
    };
    
    // Trả về token và thông tin người dùng
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles
      }
    };
  }
  
  async register(registerDto: RegisterDto) {
    try {
      // Tạo user mới trong database
      const newUser = await this.userService.create({
        username: registerDto.username,
        password: registerDto.password,
        email: registerDto.email,
        fullName: registerDto.fullName,
      });
      
      // Tạo payload cho JWT
      const payload = {
        sub: newUser._id,
        username: newUser.username,
        roles: newUser.roles
      };
      
      // Trả về token và thông tin user mới
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          roles: newUser.roles
        }
      };
    } catch (error) {
      throw error;
    }
  }
}