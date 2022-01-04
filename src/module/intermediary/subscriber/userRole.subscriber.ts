import { UserRole } from './../../../entities/userRole';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class UserRoleSubscriber implements EntitySubscriberInterface<UserRole> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserRole;
  }


}
