import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonService } from '../../services/person/person.service';
import { PersonDTO } from '../../services/dto/person.dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  @Get()
  getAllPersons(): PersonDTO[] {
    return this._personService.getAll();
  }

  @Post()
  createPerson(@Body() person: PersonDTO): PersonDTO {
    console.log('POST /persons:', person);
    return this._personService.addPerson(person);
  }
}
