// src/user/user.service.ts
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }
  
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
  
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
  
  async create(userData: CreateUserDto): Promise<UserDocument> {
    // Kiểm tra username hoặc email đã tồn tại
    if (!userData.username || !userData.email || !userData.password) {
      throw new BadRequestException('Username, email and password are required');
    }
    
    const existingUser = 
      await this.findByUsername(userData.username) || 
      await this.findByEmail(userData.email);
    
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }
    
    // Hash mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Tạo user mới với mật khẩu đã hash
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
      roles: userData.roles || ['user'], // Mặc định role 'user'
    });
    
    // Lưu và trả về user mới
    return newUser.save();
  }
  
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
  
  async update(id: string, userData: Partial<User>): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    // Nếu cập nhật mật khẩu, hash trước khi lưu
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    
    Object.assign(user, userData);
    return user.save();
  }
  
  async delete(id: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }
}