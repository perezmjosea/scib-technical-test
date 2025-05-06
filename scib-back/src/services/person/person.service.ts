/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PersonDTO } from '../dto/person.dto';

@Injectable()
export class PersonService {
  private _persons: PersonDTO[] = [];
  savePerson(person: PersonDTO) {
    this._persons.push(person);
    return person;
  }

  getAllPersons(): PersonDTO[] {
    return this._persons;
  }
}
