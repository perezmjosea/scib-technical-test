import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PersonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsIn(['junior', 'senior'])
  seniority: 'junior' | 'senior';

  @IsNumber()
  yearsOfExperience: number;

  @IsBoolean()
  availability: boolean;
}
