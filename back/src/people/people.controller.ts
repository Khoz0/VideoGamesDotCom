import {
  Controller,
  Get,
  Post,
  Body,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Param,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PersonEntity } from './entities/person.entity';
import { Observable } from 'rxjs';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import {
  HandlerParams,
  HandlerParamsPseudo,
} from './validators/handler-params';
import { LoginPersonDto } from './dto/login-person.dto';
import {hasRoles} from "../auth/decorators/roles.decorator";
import {PersonRole} from "./model/people.interface";
import {RolesGuard} from "../auth/guards/roles.guard";



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
  @ApiNotFoundResponse({
    description: "The person with the given id doesn't exist in the database",
  })
  @ApiConflictResponse({
    description: 'The pseudo or mail exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'The paramater/playload provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create new person',
    type: CreatePersonDto,
  })
  @Post()
  create(@Body() createPersonDto: CreatePersonDto): Observable<PersonEntity> {
    return this.peopleService.create(createPersonDto);
  }

  @ApiOkResponse({
    description: 'Return an array of person',
    type: PersonEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No person exists in database' })
  @Get()
  findAll(): Observable<PersonEntity[] | void> {
    return this.peopleService.findAll();
  }

  @ApiOkResponse({
    description: 'Return the person for the given "id"',
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    description: "The person with the given id doesn't exist in the database",
  })
  @ApiBadRequestResponse({
    description: 'The paramater provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
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
    description: 'Return the person for the given "pseudo"',
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    description:
      "The person with the given pseudo doesn't exist in the database",
  })
  @ApiBadRequestResponse({
    description: 'The paramater provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'pseudo',
    description: 'Unique pseudo of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('/pseudo/:pseudo')
  findOnePseudo(
    @Param() params: HandlerParamsPseudo,
  ): Observable<PersonEntity> {
    return this.peopleService.findOnePseudo(params.pseudo);
  }

  @ApiOkResponse({
    description: 'The person has been successfully updated',
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    description: "The person with the given id doesn't exist in the database",
  })
  @ApiConflictResponse({
    description: 'The pseudo or mail exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'The paramater/playload provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
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
  update(
    @Param() params: HandlerParams,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.peopleService.update(params.id, updatePersonDto);
  }

  @ApiNoContentResponse({
    description: 'The person has been sucessfuly deleted',
  })
  @ApiNotFoundResponse({
    description: "The person with the given id doesn't exist in the database",
  })
  @ApiBadRequestResponse({
    description: 'The parameter provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @hasRoles(PersonRole.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param() params: HandlerParams): Observable<void> {
    return this.peopleService.remove(params.id);
  }

  @ApiOkResponse({
    description: 'The person has been successfully loged',
    type: String,
  })
  @ApiBadRequestResponse({
    description: 'The pseudo or the password is incorrect',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to login a person',
    type: LoginPersonDto,
  })
  @Post('/login')
  login(@Body() loginPersonDto: LoginPersonDto): Observable<any> {
    return this.peopleService.login(loginPersonDto);
  }
}
