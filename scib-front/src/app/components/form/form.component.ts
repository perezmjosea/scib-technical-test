import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person/person.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private _personService = inject(PersonService);
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required]
  })
  file: File | null = null;
  fileTouched = false;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.file = input.files?.[0] ?? null;
    this.fileTouched = true;
  }

  onFormSubmit() {
    if (!this.file || this.form.invalid) return;
    this._personService.postNewPerson({
      name: this.form.value.name!,
      surname: this.form.value.surname!
    }, this.file);
    this.form.reset();
    this.file = null;
    this.fileTouched = false;
  }
}
