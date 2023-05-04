import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private sampleUser = [
    { id: 1, username: 'jane', email: 'jane234@gmail.com' },
    { id: 2, username: 'tommy', email: 'tommy754@gmail.com' },
    { id: 3, username: 'jerry', email: 'jerry234@gmail.com' },
  ];
  private sample: User[];
  constructor() {
    // const defaultData = { id: 999, name: 'john', email: 'admin@gmail.com' };
    this.sample = this.sampleUser;
  }
  findAll(): User[] {
    return this.sample;
  }

  findOne(id: number): User | undefined {
    return this.sample.find((user) => user.id === id);
  }
  create(userData: User) {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newUser = { ...userData, id };
    this.sample.push(newUser);
    console.log(newUser);
    return this.sample;
  }

  update(id: number, newUser: User) {
    const index = this.sample.findIndex((user) => user.id === id);
    const updatedUser = { ...newUser, id };
    if (index !== -1) {
      this.sample[index] = updatedUser;
    }
    console.log(updatedUser);
    return updatedUser;
  }

  delete(id: number) {
    const index = this.sample.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.sample.splice(index, 1);
    }
    console.log(this.sample);
    return this.sample;
  }
}
