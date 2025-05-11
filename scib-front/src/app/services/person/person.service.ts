import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Person } from '../../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _httpClient = inject(HttpClient);
  private _apiUrl = 'http://localhost:3000/persons';
  persons = signal<Person[]>([]);

  postNewPerson(data: FormData): Observable<Person> {
    return this._httpClient.post<Person>(this._apiUrl, data);
  }

  saveNewPerson(person: Person) {
    const localPersons = localStorage.getItem('persons');
    const persons = localPersons ? JSON.parse(localPersons) : [];
    persons.push(person);
    this.persons.set(persons);
    localStorage.setItem('persons', JSON.stringify(persons));
  }

  getAllPersons(): Observable<Person[]> {
    const stored = localStorage.getItem('persons');
    if (stored) {
      const persons = JSON.parse(stored) as Person[];
      this.persons.set(persons);
    } else {
      this.persons.set([]);
    }
    return of(this.persons());
  }
}
