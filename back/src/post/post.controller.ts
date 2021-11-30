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
import {
    ApiBadRequestResponse, ApiBody,
    ApiConflictResponse, ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import {HttpInterceptor} from "../interceptors/http.interceptor";
import {HandlerParams} from "../people/validators/handler-params";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostEntity} from "./entities/post.entity";
import {UpdatePostDto} from "./dto/update-post.dto";
import {PostService} from "./post.service";


@ApiTags('post')
@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class PostController {

    constructor(private readonly _postService: PostService) {}

    @ApiOkResponse({
        description: 'The post has been successfully created',
        type: PostEntity,
    })
    @ApiNotFoundResponse({
        description: 'The post with the given id doesn\'t exist in the database'
    })
    @ApiConflictResponse({
        description: 'The post exists in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter/payload provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiBody({
        description: 'Payload to create new post',
        type: CreatePostDto
    })
    @Post()
    create(@Body() createPostDto: CreatePostDto) : Observable<PostEntity> {
        return this._postService.create(createPostDto);
    }

    @ApiOkResponse({
        description: 'Return an array of post',
        type: PostEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No post exists in database'})
    @Get()
    findAll(): Observable<PostEntity[] | void> {
        return this._postService.findAll();
    }

    @ApiOkResponse({
        description: 'Return the post for the given "id"',
        type: PostEntity,
    })
    @ApiNotFoundResponse({
        description: 'The post with the given id doesn\'t exist in the database'
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
    findOne(@Param() params: HandlerParams): Observable<PostEntity> {
        return this._postService.findOne(params.id);
    }

    @ApiOkResponse({
        description: 'The post has been successfully updated',
        type: PostEntity,
    })
    @ApiNotFoundResponse({
        description: 'The post with the given id doesn\'t exist in the database'
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
        description: 'Payload to update a post',
        type: UpdatePostDto,
    })
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updatePostDto: UpdatePostDto) {
        return this._postService.update(params.id, updatePostDto);
    }

    @ApiNoContentResponse({
        description: 'The post has been successfuly deleted',
    })
    @ApiNotFoundResponse({
        description: 'The post with the given id doesn\'t exist in the database'
    })
    @ApiBadRequestResponse({
        description: 'The parameter provided is not good'
    })
    @ApiUnprocessableEntityResponse({
        description: 'The request can\'t be performed in the database'
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the post in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    remove(@Param() params: HandlerParams): Observable<void> {
        return this._postService.remove(params.id);
    }
}
