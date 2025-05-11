import { Controller, Post, Get, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PersonService } from '../../services/person/person.service';
import { PersonDTO } from '../../services/dto/person.dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly _personService: PersonService) { }

  @Get()
  getAllPersons(): PersonDTO[] {
    return this._personService.getAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createPerson(@UploadedFile() file: Express.Multer.File, @Body() body: { name: string; surname: string },): PersonDTO {
    return this._personService.proccessData(body, file);
  }
}
