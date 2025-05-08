import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private _formBuilder = inject(FormBuilder);
  private _httpClient = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
  private _personService = inject(PersonService);

  file: File | null = null;
  sendingData = false;

  form = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    file: [null, Validators.required]
  });

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] || null;
  }

  onFormSubmit() {
    this.form.markAllAsTouched();

    if (!this.file || this.form.invalid) {
      return;
    }

    this.sendingData = true;
    this.form.disable();

    const formData = new FormData();
    formData.append('name', this.form.value.name!);
    formData.append('surname', this.form.value.surname!);
    formData.append('file', this.file);

    this._httpClient.post<Person>('http://localhost:3000/process-excel', formData)
      .subscribe({
        next: (response) => {
          this._personService.addNewPerson(response);
          this._snackBar.open('Los datos se guardaron correctamente', 'Cerrar', { duration: 5000 });
          this.resetForm();
        },
        error: (err) => {
          this._snackBar.open(`Error al procesar los datos: ${err.message}`, 'Cerrar', { duration: 5000 });
        },
        complete: () => {
          this.resetForm();
        }
      });
  }

  deletePersons() {
    this._personService.clearPersons();
    this._snackBar.open('Los datos se eliminaron correctamente', 'Cerrar', { duration: 5000 });
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.file = null;
    this.sendingData = false;
    this.form.enable();
  }
}
