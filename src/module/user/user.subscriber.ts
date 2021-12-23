import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../../entities/user';
import * as bcrypt from 'bcrypt';
import { bcryptSalt } from '../../common/constants/common.constants';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly bcryptSalt: number;

  constructor(connection: Connection) {
    connection.subscribers.push(this);
    this.bcryptSalt = bcryptSalt;
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    const { password } = event.entity;
    event.entity.password = await bcrypt.hash(password, this.bcryptSalt);
  }
}