import { Injectable } from '@nestjs/common';
import { PersonDTO } from '../dto/person.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PersonService {
  private _persons: PersonDTO[] = [];
  private _filePath = path.resolve(process.cwd(), 'data/person.json');

  constructor() {
    this._loadFromFile();
  }

  private _loadFromFile() {
    if (fs.existsSync(this._filePath)) {
      const data = fs.readFileSync(this._filePath, 'utf-8');
      this._persons = JSON.parse(data) as PersonDTO[];
    }
  }

  private _saveToFile() {
    const directory = path.dirname(this._filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(
      this._filePath,
      JSON.stringify(this._persons, null, 2),
      'utf-8',
    );
  }

  getAll(): PersonDTO[] {
    return this._persons;
  }

  addPerson(person: PersonDTO): PersonDTO {
    this._persons.push(person);
    this._saveToFile();
    return person;
  }
}
