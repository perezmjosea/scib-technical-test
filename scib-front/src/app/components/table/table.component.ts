import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person/person.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  private _personService = inject(PersonService);
  loading = signal(true);
  persons = this._personService.persons;
  displayedColumns = ['name', 'surname', 'seniority', 'yearsOfExperience', 'availability'];

  constructor() {
    setTimeout(() => {
      this.loading.set(this.persons().length === 0);
    }, 500);
  }
}
