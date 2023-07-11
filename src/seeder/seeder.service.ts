import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel('User')
    private readonly user_model: Model<User>,
  ) {}

  async seed(): Promise<void> {
    await this.user_model.deleteMany({});

    const users = [];

    for (let counter = 0; counter <= 10; counter += 1) {
      const user: User = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        user_id: Number(faker.number.bigInt({ min: 100, max: 999 })),
      };

      users.push(user);
    }

    await this.user_model.create(users);
  }
}
