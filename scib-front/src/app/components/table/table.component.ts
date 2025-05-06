import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../interfaces/person';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  private _personService = inject(PersonService);
  persons = computed(() => this._personService.persons());

  displayedColumns: (keyof Person)[] = ['name', 'surname', 'seniority', 'years', 'availability'];
}
