// src/users/entities/user.entity.ts

export class User {
  id: number;

  username: string;

  password: string;

  email?: string;

  fullName?: string;

  roles?: string[];
}
