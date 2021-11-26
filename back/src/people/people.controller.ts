import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {ApiBody, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {PersonEntity} from "./entities/person.entity";
import {Observable} from "rxjs";
import {HttpInterceptor} from "../interceptors/http.interceptor";
import {HandlerParams} from "./validators/handler-params";
import * as mongoose from "mongoose";

@ApiTags('people')
@Controller('people')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @ApiOkResponse({
    description: 'The person has been successfully created',
    type: PersonEntity,
  })
  @ApiBody({
    description: 'Payload to create new person',
    type: CreatePersonDto
  })
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @ApiOkResponse({
    description: 'Return an array of person',
    type: PersonEntity,
    isArray: true,
  })
  @ApiNoContentResponse({description: 'No person exists in database'})
  @Get()
  findAll(): Observable<PersonEntity[] | void> {
    return this.peopleService.findAll();
  }

  @ApiOkResponse({
    description: 'Return the person for the given "id"',
    type: PersonEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<PersonEntity> {
    return this.peopleService.findOne(params.id);
  }

  @ApiOkResponse({
    description: 'The person has been successfully updated',
    type: PersonEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({
    description: 'Payload to update a person',
    type: UpdatePersonDto,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @ApiOkResponse({
    description: 'The person has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
