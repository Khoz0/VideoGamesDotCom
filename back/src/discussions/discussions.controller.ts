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
import {CreateDiscussionDto} from "./dto/create-discussion.dto";
<<<<<<< HEAD:back/src/discussion/discussion.controller.ts
import {DiscussionService} from "./discussion.service";
=======
import {DiscussionsService} from "./discussions.service";
>>>>>>> lien-api-front-forum:back/src/discussions/discussions.controller.ts
import {
    ApiBadRequestResponse, ApiBody,
    ApiConflictResponse, ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {HttpInterceptor} from "../interceptors/http.interceptor";
<<<<<<< HEAD:back/src/discussion/discussion.controller.ts
import {DiscussionEntity} from "./entities/discussion.entity";
=======
import {DiscussionsEntity} from "./entities/discussions.entity";
>>>>>>> lien-api-front-forum:back/src/discussions/discussions.controller.ts
import {HandlerParams} from "../people/validators/handler-params";
import {UpdateDiscussionDto} from "./dto/update-discussion.dto";


@ApiTags('discussions')
@Controller('discussions')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class DiscussionsController {

    constructor(private readonly _discussionService: DiscussionsService) {}

    @ApiOkResponse({
        description: 'The discussions has been successfully created',
        type: DiscussionsEntity,
    })
    @ApiNotFoundResponse({
        description: 'The discussions with the given id doesn\'t exist in the database'
    })
    @ApiConflictResponse({
        description: 'The discussions exists in the database'
    })
    @ApiBadRequestResponse({
        description: 'The paramater/playload provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiBody({
        description: 'Payload to create new discussions',
        type: CreateDiscussionDto
    })
    @Post()
    create(@Body() createDiscussionDto: CreateDiscussionDto) : Observable<DiscussionsEntity> {
        console.log("zéparti")
        return this._discussionService.create(createDiscussionDto);
    }

    @ApiOkResponse({
        description: 'Return an array of discussions',
        type: DiscussionsEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No discussions exists in database'})
    @Get()
    findAll(): Observable<DiscussionsEntity[] | void> {
        return this._discussionService.findAll();
    }

    @ApiOkResponse({
        description: 'Return the discussions for the given "id"',
        type: DiscussionsEntity,
    })
    @ApiNotFoundResponse({
        description: 'The discussions with the given id doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the discussions in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<DiscussionsEntity> {
        return this._discussionService.findOne(params.id);
    }

    @ApiOkResponse({
<<<<<<< HEAD:back/src/discussion/discussion.controller.ts
        description: 'The discussion has been successfully updated',
        type: DiscussionEntity,
=======
        description: 'The discussions has been successfully updated',
        type: DiscussionsEntity,
>>>>>>> lien-api-front-forum:back/src/discussions/discussions.controller.ts
    })
    @ApiNotFoundResponse({
        description: 'The discussions with the given id doesn\'t exist in the database'
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
        description: 'Unique identifier of the discussions in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({
<<<<<<< HEAD:back/src/discussion/discussion.controller.ts
        description: 'Payload to update a discussion',
=======
        description: 'Payload to update a discussions',
>>>>>>> lien-api-front-forum:back/src/discussions/discussions.controller.ts
        type: UpdateDiscussionDto,
    })
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updateDiscussionDto: UpdateDiscussionDto) {
        return this._discussionService.update(params.id, updateDiscussionDto);
    }

    @ApiNoContentResponse({
        description: 'The discussions has been successfuly deleted',
    })
    @ApiNotFoundResponse({
        description: 'The discussions with the given id doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the discussions in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    remove(@Param() params: HandlerParams): Observable<void> {
        return this._discussionService.remove(params.id);
    }
}
