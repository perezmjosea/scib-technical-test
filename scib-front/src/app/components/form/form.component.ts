import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person/person.service';
import { Person } from '../../interfaces/person';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private _personService = inject(PersonService);
  private _formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  file: File | null = null;
  fileTouched = false;
  fileData: (string | number | boolean)[] = [];
  sendingData: boolean = false
  form = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    file: [null, Validators.required]
  })

  private _isValidFileData(data: unknown): data is [string, number, boolean] {
    if (!Array.isArray(data) || data.length !== 3) {
      return false
    };
    const [seniority, years, availability] = data;
    const validSeniority = seniority === 'Junior' || seniority === 'Senior';
    const validYears = typeof years === 'number' && !isNaN(years);
    const validAvailability = typeof availability === 'boolean' || availability === 'Yes' || availability === 'No';
  
    return validSeniority && validYears && validAvailability;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.[0];
    this.fileTouched = true;
  
    if (!selectedFile) {
      this.file = null;
      return;
    }
  
    const fileReader = new FileReader();
    this.file = selectedFile;
  
    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const book = XLSX.read(data, { type: 'array' });
      const sheetName = book.SheetNames[0];
      const sheet = book.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 })[1];
      console.log(rawData);
  
      if (!this._isValidFileData(rawData)) {
        this.fileData = [];
        this._snackBar.open('Archivo inválido. Debe contener: seniority ("junior" o "senior"), años (número) y disponibilidad (booleano).', 'Cerrar', {
          duration: 5000
        });
        return;
      }
      this.fileData = rawData;
    };
  
    fileReader.readAsArrayBuffer(selectedFile);
  }

  onFormSubmit() {
    this.form.markAllAsTouched();
    this.fileTouched = true;
  
    if (!this.file || this.form.invalid || this.fileData.length !== 3) {
      return;
    }

    this.sendingData = true;
    this.form.disable();
  
    const newPerson: Person = {
      name: this.form.value.name as string,
      surname: this.form.value.surname as string,
      seniority: this.fileData[0].toString().toLowerCase() as 'junior' | 'senior',
      yearsOfExperience: Number(this.fileData[1]),
      availability: Boolean(this.fileData[2]) || this.fileData[2].toString().toLowerCase() === 'yes' ? true : false
    };
  
    this._personService.postNewPerson(newPerson).subscribe({
      next: () => {
        this._snackBar.open('Persona guardada correctamente', 'Cerrar', { duration: 5000 });
        this._personService.loadPersons();
        this.form.reset();
        this.file = null;
        this.fileTouched = false;
        this.sendingData = false;
        this.form.enable();
      },
      error: () => {
        this._snackBar.open('Error al guardar persona', 'Cerrar', { duration: 5000 });
        this.sendingData = false;
        this.form.enable();
      }
    });
  }
}
