import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { BadRequestException } from '@nestjs/common';
import { PersonDTO } from '../dto/person.dto';
import * as XLSX from 'xlsx';

// Mock de XLSX
jest.mock('xlsx', () => ({
  read: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonService],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  describe('getAll', () => {
    it('debe devolver todas las personas', () => {
      const persons = service.getAll();
      expect(persons).toEqual([]);
    });
  });

  describe('proccessData', () => {
    it('debe lanzar un error si no se proporciona un archivo', () => {
      const body = { name: 'John', surname: 'Doe' };
      const file = { buffer: Buffer.from('') } as Express.Multer.File;

      expect(() => service.proccessData(body, file)).toThrow(BadRequestException);
    });

    it('debe lanzar un error si el archivo no contiene datos válidos', () => {
      const body = { name: 'John', surname: 'Doe' };
      const file = { buffer: Buffer.from('') } as Express.Multer.File;

      // Simulamos el comportamiento de XLSX.read y sheet_to_json
      (XLSX.read as jest.Mock).mockReturnValue({
        Sheets: { sheet1: {} },
        SheetNames: ['sheet1'],
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue([]); // Mock correcto

      expect(() => service.proccessData(body, file)).toThrow(BadRequestException);
    });

    it('debe lanzar un error si el archivo contiene datos no válidos', () => {
      const body = { name: 'John', surname: 'Doe' };
      const file = { buffer: Buffer.from('') } as Express.Multer.File;

      // Simulamos el comportamiento de XLSX.read y sheet_to_json
      (XLSX.read as jest.Mock).mockReturnValue({
        Sheets: { sheet1: {} },
        SheetNames: ['sheet1'],
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue([
        ['seniority', 'years', 'availability'],
        ['junior', 'five', 'yes'],
      ]);

      expect(() => service.proccessData(body, file)).toThrow(BadRequestException);
    });

    it('debe procesar correctamente un archivo válido', () => {
      const body = { name: 'John', surname: 'Doe' };
      const file = { buffer: Buffer.from('') } as Express.Multer.File;

      // Simulamos el comportamiento de XLSX.read y sheet_to_json
      (XLSX.read as jest.Mock).mockReturnValue({
        Sheets: { sheet1: {} },
        SheetNames: ['sheet1'],
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue([
        ['seniority', 'years', 'availability'],
        ['junior', '5', 'yes'],
      ]);

      const personDTO: PersonDTO = service.proccessData(body, file);

      expect(personDTO).toEqual({
        name: 'John',
        surname: 'Doe',
        seniority: 'junior',
        yearsOfExperience: 5,
        availability: true,
      });
    });

    it('debe lanzar un error si los datos del archivo son inválidos', () => {
      const body = { name: 'John', surname: 'Doe' };
      const file = { buffer: Buffer.from('') } as Express.Multer.File;

      // Simulamos el comportamiento de XLSX.read y sheet_to_json
      (XLSX.read as jest.Mock).mockReturnValue({
        Sheets: { sheet1: {} },
        SheetNames: ['sheet1'],
      });
      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue([
        ['seniority', 'years', 'availability'],
        ['junior', 'abc', 'yes'],
      ]);

      expect(() => service.proccessData(body, file)).toThrowError(
        'Archivo inválido. Debe contener: seniority ("junior"/"senior"), años (número) y disponibilidad (booleano o "yes"/"no").'
      );
    });
  });
});
