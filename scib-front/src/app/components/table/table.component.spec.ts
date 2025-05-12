import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { PersonService } from '../../services/person/person.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Person } from '../../interfaces/person';
import { MatPaginator } from '@angular/material/paginator';
import { signal } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let personService: PersonService;

  const mockPerson: Person = {
    name: 'John',
    surname: 'Doe',
    seniority: 'senior',
    yearsOfExperience: 5,
    availability: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [MatTableModule, MatPaginatorModule],
      providers: [PersonService]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    personService = TestBed.inject(PersonService);
  });

  it('should update table with new person', () => {
    personService.persons.set([mockPerson]);

    fixture.detectChanges();

    const newPerson: Person = {
      name: 'Jane',
      surname: 'Smith',
      seniority: 'junior',
      yearsOfExperience: 2,
      availability: true
    };
    component.updateTableWithNewPerson(newPerson);

    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data).toContain(newPerson);
  });
});
