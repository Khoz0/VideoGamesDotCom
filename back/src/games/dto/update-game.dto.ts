import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @ApiProperty({
    name: 'title',
    description: 'Title of the game',
    example: 'Pokemon',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'synopsis',
    description: 'Synopsis of the games',
    example: 'A lot of text',
  })
  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @ApiProperty({
    name: 'note',
    description: 'Note given to the game',
    example: '18',
  })
  @IsNumber()
  @IsNotEmpty()
  note: number;

  @ApiProperty({
    name: 'image',
    description: 'Url of the image who represent the game',
    example: 'https://url.com/image.png',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    name: 'test',
    description: 'Test of the game',
    example: 'A lot of text',
  })
  @IsString()
  test: string;

  @ApiProperty({
    name: 'platform',
    description: 'Platform of where to buy/run the game',
    example: 'PC',
  })
  @IsString()
  @IsNotEmpty()
  platform: string;
}
