// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme', // 'changeme' hashed
      email: 'john@example.com',
      fullName: 'John Doe',
      roles: ['user']
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess', // 'guess' hashed
      email: 'maria@example.com',
      fullName: 'Maria Garcia',
      roles: ['admin', 'user']
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  
  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
  
  // Trong ứng dụng thực tế, bạn sẽ thêm các phương thức như:
  // create, update, delete, findAll, v.v.
}