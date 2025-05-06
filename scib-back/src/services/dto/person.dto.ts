/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/candidate/dto/create-candidate.dto.ts
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum Seniority {
  JUNIOR = 'junior',
  SENIOR = 'senior',
}

export class PersonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEnum(Seniority)
  seniority: Seniority;

  @IsNumber()
  yearsOfExperience: number;

  @IsBoolean()
  availability: boolean;
}
