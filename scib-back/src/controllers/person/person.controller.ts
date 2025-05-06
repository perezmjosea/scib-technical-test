import { Controller, Get, Post } from '@nestjs/common';
import { PersonService } from '../../services/person/person.service';
import { PersonDTO } from '../../services/dto/person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  savePerson(person: PersonDTO): PersonDTO {
    return this.personService.savePerson(person);
  }

  @Get()
  getAllPersons(): PersonDTO[] {
    return this.personService.getAllPersons();
  }
}
