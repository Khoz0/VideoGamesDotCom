import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GameEntity } from './entities/game.entity';
import {HandlerParams} from "./validators/handler-params";

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOkResponse({
    description: 'The game has been successfully created',
    type: GameEntity,
  })
  @ApiNotFoundResponse({
    description: "The game with the given id doesn't exist in the database",
  })
  @ApiConflictResponse({
    description: 'The title exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'The paramater/playload provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create new game',
    type: CreateGameDto,
  })
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @ApiOkResponse({
    description: 'Return an array of game',
    type: GameEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No game exists in database' })
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @ApiOkResponse({
    description: 'Return the game for the given "id"',
    type: GameEntity,
  })
  @ApiNotFoundResponse({
    description: "The game with the given id doesn't exist in the database",
  })
  @ApiBadRequestResponse({
    description: 'The paramater provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the game in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams) {
    return this.gamesService.findOne(params.id);
  }

  @ApiOkResponse({
    description: 'The game has been successfully updated',
    type: GameEntity,
  })
  @ApiNotFoundResponse({
    description: "The game with the given id doesn't exist in the database",
  })
  @ApiConflictResponse({
    description: 'The title exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'The paramater/playload provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the game in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({
    description: 'Payload to update a person',
    type: UpdateGameDto,
  })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(params.id, updateGameDto);
  }

  @ApiNoContentResponse({
    description: 'The game has been sucessfuly deleted',
  })
  @ApiNotFoundResponse({
    description: "The game with the given id doesn't exist in the database",
  })
  @ApiBadRequestResponse({
    description: 'The paramater provided is not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the game in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  remove(@Param() params: HandlerParams) {
    return this.gamesService.remove(params.id);
  }
}
