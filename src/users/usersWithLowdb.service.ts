import { Injectable } from '@nestjs/common';
// import { CreateUserType } from 'src/utils/types';
import { User } from './users.model';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import lodash from 'lodash';

interface Data {
  users: User[];
}

class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<T> = lodash.chain(this).get('data');
}

@Injectable()
export class UsersService {
  // private tempUser = [
  //   { username: 'jane', email: 'jane234@gmail.com' },
  //   { username: 'tommy', email: 'tommy754@gmail.com' },
  //   { username: 'jerry', email: 'jerry234@gmail.com' },
  // ];

  private adapter: JSONFile<Data>;
  private db: LowWithLodash<Data>;

  constructor() {
    // const defaultData = { id: 999, name: 'john', email: 'admin@gmail.com' };
    this.adapter = new JSONFile<Data>('db.json');
    this.db = new LowWithLodash<Data>(this.adapter, { users: [] });
    // this.db.read();
    // Initialize default data if the file is empty
    this.db.data;
    this.db.write();
  }
  // getUsers() {
  //   return this.tempUser;
  // }
  //
  // getUserById(id: number) {
  //   return { id, username: 'jane', email: 'jane234@gmail.com' };
  // }
  // createUser(userSpecs: CreateUserType) {
  //   this.tempUser.push(userSpecs);
  //   return;
  // }
  // createUser(user: User): User {
  //   const lastUser = this.db.get('users').last().value();
  //   const newId = lastUser ? lastUser.id + 1 : 1;
  //   const newUser = { ...user, id: newId };
  //   this.db.get('users').push(newUser).write();
  //   return newUser;
  // }
  findAll(): User[] {
    return this.db.data.users;
  }
  findOne(id: number): User | undefined {
    return this.db.chain.get('users').find({ id }).value();
  }

  create(user: User): void {
    this.db.data.users.push(user);
    this.db.write();
  }
  update(id: number, newUser: User): void {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, newUser);
      this.db.write();
    }
  }
  delete(id: number): void {
    const index = this.db.data.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.db.data.users.splice(index, 1);
      this.db.write();
    }
  }
}
