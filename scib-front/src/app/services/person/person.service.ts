import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _httpClient = inject(HttpClient);
  persons = signal<Person[]>([]);

  constructor() {
    this.loadPersons();
  }

  loadPersons(): void {
    const localData = localStorage.getItem('persons');
    if (localData) {
      this.persons.set(JSON.parse(localData));
    } else {
      this._httpClient.get<Person[]>('assets/data/persons.json').subscribe({
        next: (data) => {
          this.persons.set(data);
          console.log('Data loaded from person.json:', data);
          localStorage.setItem('persons', JSON.stringify(data));
        },
        error: (err) => console.error('Error al leer el archivo person.json:', err)
      });
    }
  }

  addNewPerson(newPerson: Person): void {
    const current = this.persons();
    const updated = [...current, newPerson];
    this.persons.set(updated);
    localStorage.setItem('persons', JSON.stringify(updated));
  }
}
