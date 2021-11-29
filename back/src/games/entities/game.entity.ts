import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GameEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '61a13d908efa895f56ee120e',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'title',
    description: 'Title of the game',
    example: 'Pokemon',
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    name: 'synopsis',
    description: 'Synopsis of the games',
    example: 'A lot of text',
  })
  @Expose()
  @Type(() => String)
  synopsis: string;

  @ApiProperty({
    name: 'note',
    description: 'Note given to the game',
    example: '18',
  })
  @Expose()
  @Type(() => Number)
  note: number;

  @ApiProperty({
    name: 'image',
    description: 'Url of the image who represent the game',
    example: 'https://url.com/image.png',
  })
  @Expose()
  @Type(() => String)
  image: string;

  @ApiProperty({
    name: 'test',
    description: 'Test of the game',
    example: 'A lot of text',
  })
  @Expose()
  @Type(() => String)
  test: string;

  @ApiProperty({
    name: 'platform',
    description: 'Platform of where to buy/run the game',
    example: 'PC',
  })
  @Expose()
  @Type(() => String)
  platform: string;

  constructor(partial: Partial<GameEntity>) {
    Object.assign(this, partial);
  }
}
