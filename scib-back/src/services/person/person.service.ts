import { Injectable, OnModuleInit } from '@nestjs/common';
import { PersonDTO } from '../dto/person.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PersonService implements OnModuleInit {
  private readonly _filePath = path.resolve(__dirname, '../db/persons.json');
  private _persons: PersonDTO[] = [];

  onModuleInit() {
    this._readJSON();
  }

  private _readJSON() {
    if (!fs.existsSync(this._filePath)) {
      fs.writeFileSync(this._filePath, '[]');
    }
    if (fs.existsSync(this._filePath)) {
      try {
        const content = fs.readFileSync(this._filePath, 'utf-8');
        this._persons = JSON.parse(content || '[]') as PersonDTO[];
      } catch (error) {
        console.error('Error on JSON file:', error);
        this._persons = [];
      }
    }
  }
  savePerson(person: PersonDTO) {
    this._persons.push(person);
    return person;
  }

  getAllPersons(): PersonDTO[] {
    return this._persons;
  }
}
