import { BadRequestException, Injectable } from '@nestjs/common';
import { PersonDTO } from '../dto/person.dto';
import * as path from 'path';
import * as XLSX from 'xlsx';

@Injectable()
export class PersonService {
  private _persons: PersonDTO[] = [];

  getAll(): PersonDTO[] {
    return this._persons;
  }

  proccessData(body: { name: string; surname: string; }, file: Express.Multer.File): PersonDTO {
    let personDTO: PersonDTO;
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (data.length < 2) {
      throw new BadRequestException('El archivo no contiene datos válidos');
    }

    const [seniority, years, availability] = data[1];

    const seniorityStr = (seniority || '').toString().toLowerCase();
    const isValidSeniority = seniorityStr === 'junior' || seniorityStr === 'senior';
    const isValidYears = !isNaN(Number(years));
    const availabilityStr = (availability || '').toString().toLowerCase();
    const isValidAvailability = ['true', 'false', 'yes', 'no'].includes(availabilityStr);

    if (!isValidSeniority || !isValidYears || !isValidAvailability) {
      throw new BadRequestException(
        'Archivo inválido. Debe contener: seniority ("junior"/"senior"), años (número) y disponibilidad (booleano o "yes"/"no").'
      );
    }

    personDTO = {
      name: body.name,
      surname: body.surname,
      seniority: seniorityStr as 'junior' | 'senior',
      yearsOfExperience: Number(years),
      availability: ['true', 'yes'].includes(availabilityStr),
    };

    return personDTO;
  }
}
