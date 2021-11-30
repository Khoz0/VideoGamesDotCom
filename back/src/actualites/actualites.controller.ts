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
import {CreateActualitesDto} from "./dto/create-actualites.dto";
import {ActualitesService} from "./actualites.service";
import {
    ApiBadRequestResponse, ApiBody,
    ApiConflictResponse, ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {HttpInterceptor} from "../interceptors/http.interceptor";
import {ActualitesEntity} from "./entities/actualites.entity";
import {HandlerParams} from "../people/validators/handler-params";
import {UpdateActualitesDto} from "./dto/update-actualites.dto";


@ApiTags('actualites')
@Controller('actualites')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class ActualitesController {

    constructor(private readonly _actualitesService: ActualitesService) {}

    @ApiOkResponse({
        description: 'The actualites has been successfully created',
        type: ActualitesEntity,
    })
    @ApiNotFoundResponse({
        description: 'The actualites with the given id doesn\'t exist in the database'
    })
    @ApiConflictResponse({
        description: 'The actualites exists in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter/payload provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiBody({
        description: 'Payload to create new actualites',
        type: CreateActualitesDto
    })
    @Post()
    create(@Body() createActualitesDto: CreateActualitesDto) : Observable<ActualitesEntity> {
        return this._actualitesService.create(createActualitesDto);
    }

    @ApiOkResponse({
        description: 'Return an array of actualites',
        type: ActualitesEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No actualites exists in database'})
    @Get()
    findAll(): Observable<ActualitesEntity[] | void> {
        return this._actualitesService.findAll();
    }

    @ApiOkResponse({
        description: 'Return the actualites for the given "id"',
        type: ActualitesEntity,
    })
    @ApiNotFoundResponse({
        description: 'The actualites with the given id doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the actualites in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<ActualitesEntity> {
        return this._actualitesService.findOne(params.id);
    }

    @ApiOkResponse({
        description: 'The actualites has been successfully updated',
        type: ActualitesEntity,
    })
    @ApiNotFoundResponse({
        description: 'The actualites with the given id doesn\'t exist in the database'
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
        description: 'Unique identifier of the actualites in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({
        description: 'Payload to update a actualites',
        type: UpdateActualitesDto,
    })
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updateActualitesDto: UpdateActualitesDto) {
        return this._actualitesService.update(params.id, updateActualitesDto);
    }

    @ApiNoContentResponse({
        description: 'The actualites has been successfuly deleted',
    })
    @ApiNotFoundResponse({
        description: 'The actualites with the given id doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the actualites in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    remove(@Param() params: HandlerParams): Observable<void> {
        return this._actualitesService.remove(params.id);
    }
}
