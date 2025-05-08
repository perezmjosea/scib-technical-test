import { Injectable, signal } from '@angular/core';
import { Person } from '../../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  persons = signal<Person[]>([]);

  constructor() {
    this.loadPersons();
  }

  loadPersons(): void {
    const data = localStorage.getItem('persons');
    this.persons.set(data ? JSON.parse(data) : []);
  }

  addNewPerson(newPerson: Person): void {
    const newData = [...this.persons(), newPerson];
    this.persons.set(newData);
    localStorage.setItem('persons', JSON.stringify(newData));
  }

  clearPersons(): void {
    localStorage.removeItem('persons');
    this.persons.set([]);
  }
}
