import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Person } from '../../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  private _httpClient = inject(HttpClient);
  persons = signal<Person[]>([]);

  postNewPerson(formData: {name: string, surname: string}, file: File) {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('surname', formData.surname);
    data.append('file', file);

    this._httpClient.post<Person>('http://localhost:3000/candidates/upload', data)
      .subscribe(person => {
        this.persons.update(pers => [...pers, person]);
      })
  }
}
