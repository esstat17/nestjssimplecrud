import { type CreateUserType } from 'src/utils/types';

export class User {
  id: CreateUserType['id'];
  username: CreateUserType['username'];
  email: CreateUserType['email'];

  constructor({ id, username, email }: CreateUserType) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}
