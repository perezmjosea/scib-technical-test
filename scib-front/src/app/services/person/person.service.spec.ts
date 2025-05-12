import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonService } from './person.service';
import { Person } from '../../interfaces/person';

describe('PersonService', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;

  const mockPerson: Person = {
    name: 'John',
    surname: 'Doe',
    seniority: 'senior',
    yearsOfExperience: 5,
    availability: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService]
    });

    service = TestBed.inject(PersonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a new person and return it', () => {
    const formData = new FormData();
    formData.append('name', mockPerson.name);
    formData.append('surname', mockPerson.surname);
    formData.append('seniority', mockPerson.seniority);
    formData.append('yearsOfExperience', mockPerson.yearsOfExperience.toString());
    formData.append('availability', mockPerson.availability.toString());

    service.postNewPerson(formData).subscribe(person => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpMock.expectOne('http://localhost:3000/persons');
    expect(req.request.method).toBe('POST');
    req.flush(mockPerson);
  });

  it('should save new person to localStorage and update persons signal', () => {
    spyOn(localStorage, 'setItem');
    service.saveNewPerson(mockPerson);

    const storedPersons = JSON.parse(localStorage.getItem('persons') || '[]');
    expect(storedPersons).toContain(mockPerson);
    expect(localStorage.setItem).toHaveBeenCalledWith('persons', JSON.stringify([mockPerson]));
  });

  it('should get all persons from localStorage and return as observable', () => {
    const storedPersons: Person[] = [mockPerson];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedPersons));

    service.getAllPersons().subscribe(persons => {
      expect(persons).toEqual(storedPersons);
    });
  });

  it('should return empty array if no persons are stored in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    service.getAllPersons().subscribe(persons => {
      expect(persons).toEqual([]);
    });
  });
});
