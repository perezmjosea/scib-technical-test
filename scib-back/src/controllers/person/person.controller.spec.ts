import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from '../../services/person/person.service';
import { PersonDTO } from '../../services/dto/person.dto';
import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

describe('PersonController', () => {
  let controller: PersonController;
  let personService: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        PersonService,
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    personService = module.get<PersonService>(PersonService);
  });

  describe('getAllPersons', () => {
    it('debe devolver todas las personas', async () => {
      const result: PersonDTO[] = [
        { name: 'John', surname: 'Doe', seniority: 'junior', yearsOfExperience: 2, availability: true },
      ];

      // Mock manual de getAll
      jest.spyOn(personService, 'getAll').mockReturnValue(result);

      expect(await controller.getAllPersons()).toBe(result);
    });
  });

  describe('createPerson', () => {
    it('debe devolver una persona procesada correctamente', async () => {
      const file = { buffer: Buffer.from('') } as Express.Multer.File;
      const body = { name: 'John', surname: 'Doe' };

      const result: PersonDTO = {
        name: 'John',
        surname: 'Doe',
        seniority: 'junior',
        yearsOfExperience: 2,
        availability: true,
      };

      // Mock manual de proccessData
      jest.spyOn(personService, 'proccessData').mockReturnValue(result);

      expect(await controller.createPerson(file, body)).toBe(result);
    });

    it('debe lanzar un error si el archivo no es válido', async () => {
      const file = { buffer: Buffer.from('') } as Express.Multer.File;
      const body = { name: 'John', surname: 'Doe' };

      // Mock manual para que proccessData lance un error
      jest.spyOn(personService, 'proccessData').mockImplementation(() => {
        throw new BadRequestException('Archivo no válido');
      });

      await expect(controller.createPerson(file, body)).rejects.toThrowError(
        'Archivo no válido',
      );
    });
  });
});
