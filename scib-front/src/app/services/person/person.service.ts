import { inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements OnInit {

  private _httpClient = inject(HttpClient);
  private _apiUrl = 'http://localhost:3000/persons';
  persons = signal<Person[]>([]);

  ngOnInit(): void {
    this.loadPersons()
  }

  loadPersons(): void {
    this.getAllPersons().subscribe({
      next: (data) => this.persons.set(data),
      error: (err) => console.error('Error loading persons:', err)
    });
  }
  
  getAllPersons(): Observable<Person[]> {
    return this._httpClient.get<Person[]>(this._apiUrl);
  }
  
  postNewPerson(person: Person): Observable<Person> {
    return this._httpClient.post<Person>(this._apiUrl, person);
  }
}
