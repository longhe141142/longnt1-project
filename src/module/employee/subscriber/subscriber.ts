import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Employee } from '../../../entities/employee';

@EventSubscriber()
export class EmployeeSubscriber implements EntitySubscriberInterface<Employee> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Employee;
  }

  async beforeInsert(event: InsertEvent<Employee>): Promise<void> {
    const { firstName, lastName } = event.entity;
    event.entity.fullName = (firstName + ' ' + lastName).trim();
  }

}
