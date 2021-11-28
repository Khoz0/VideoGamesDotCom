import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors
} from '@nestjs/common';
import {Observable} from "rxjs";
import {PersonEntity} from "../people/entities/person.entity";
import {CreateDiscussionDto} from "./dto/create-discussion.dto";
import {PeopleService} from "../people/people.service";
import {DiscussionService} from "./discussion.service";
import {
    ApiBadRequestResponse, ApiBody,
    ApiConflictResponse, ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {HttpInterceptor} from "../interceptors/http.interceptor";
import {DiscussionEntity} from "./entities/discussion.entity";
import {CreatePersonDto} from "../people/dto/create-person.dto";
import {HandlerParams} from "../people/validators/handler-params";
import {UpdatePersonDto} from "../people/dto/update-person.dto";
import {UpdateDiscussionDto} from "./dto/update-discussion.dto";


@ApiTags('discussion')
@Controller('discussion')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class DiscussionController {

    constructor(private readonly _discussionService: DiscussionService) {}

    @ApiOkResponse({
        description: 'The discussion has been successfully created',
        type: DiscussionEntity,
    })
    @ApiNotFoundResponse({
        description: 'The discussion with the given id doesn\'t exist in the database'
    })
    @ApiConflictResponse({
        description: 'The discussion exists in the database'
    })
    @ApiBadRequestResponse({
        description: 'The paramater/playload provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiBody({
        description: 'Payload to create new discussion',
        type: CreateDiscussionDto
    })
    @Post()
    create(@Body() createDiscussionDto: CreateDiscussionDto) : Observable<DiscussionEntity> {
        return this._discussionService.create(createDiscussionDto);
    }

    @ApiOkResponse({
        description: 'Return an array of discussions',
        type: DiscussionEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No discussion exists in database'})
    @Get()
    findAll(): Observable<DiscussionEntity[] | void> {
        return this._discussionService.findAll();
    }

    @ApiOkResponse({
        description: 'Return the discussion for the given "id"',
        type: DiscussionEntity,
    })
    @ApiNotFoundResponse({
        description: 'The discussion with the given id doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the discussion in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<DiscussionEntity> {
        return this._discussionService.findOne(params.id);
    }

    @ApiOkResponse({
        description: 'The discussion has been successfully updated',
        type: PersonEntity,
    })
    @ApiNotFoundResponse({
        description: 'The discussion with the given id doesn\'t exist in the database'
    })
    @ApiConflictResponse({
        description: 'The id exists in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter/payload provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the discussion in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({
        description: 'Payload to update a discussion',
        type: UpdatePersonDto,
    })
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updateDiscussionDto: UpdateDiscussionDto) {
        return this._discussionService.update(params.id, updateDiscussionDto);
    }

    @ApiNoContentResponse({
        description: 'The discussion has been successfuly deleted',
    })
    @ApiNotFoundResponse({
        description: 'The discussion with the given id doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the discussion in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    remove(@Param() params: HandlerParams): Observable<void> {
        return this._discussionService.remove(params.id);
    }
}
