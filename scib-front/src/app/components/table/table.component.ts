import { AfterViewInit, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../interfaces/person';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _personService = inject(PersonService);

  loading = signal(true);
  persons = computed(() => this._personService.persons());
  dataSource = new MatTableDataSource<Person>();
  displayedColumns: (keyof Person)[] = ['name', 'surname', 'seniority', 'yearsOfExperience', 'availability'];

  ngOnInit(): void {
    this._personService.getAllPersons().subscribe((data) => {
      this._personService.persons.set(data);
      this.dataSource.data = data;
    });
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateTableWithNewPerson(newPerson: Person): void {
    const updatedData = [...this.dataSource.data, newPerson];
    this.dataSource.data = updatedData;
    this.paginator.lastPage();
  }
}
