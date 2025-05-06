import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../interfaces/person';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  private _personService = inject(PersonService);
  loading = signal(true);
  persons = computed(() => this._personService.persons());
  displayedColumns: (keyof Person)[] = ['name', 'surname', 'seniority', 'yearsOfExperience', 'availability'];

  ngOnInit(): void {
    this._personService.getAllPersons().subscribe({
      next: (data) => {
        this._personService.persons.set(data);
        this.loading.set(false);
      },
      error: () => {
        console.error('Error al obtener las personas');
        this.loading.set(false);
      }
    });
  }
}
