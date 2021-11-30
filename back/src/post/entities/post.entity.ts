import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class PostEntity {

    @ApiProperty({name: 'id', description: 'Unique identifier in the database', example: '61a13d908efa895f56ee120e'})
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({name: 'idDiscussion', description: 'id of the discussion in witch the post appears', example: '61a13d908efa895f56hh141f'})
    @Expose()
    @Type(() => String)
    idDiscussion: string;

    @ApiProperty({name: 'author', description: 'The author of the post', example: 'xXSasukedu95Xx'})
    @Expose()
    @Type(() => String)
    author: string;

    @ApiProperty({name: 'text', description: 'the text of the post', example: 'Hello guys !!!!!'})
    @Exclude()
    @Type(() => String)
    text: string;

    @ApiProperty({name: 'creationDate', description: 'Date of the creation of the post', example: '28/11/2021'})
    @Exclude()
    @Type(() => String)
    creationDate: string;

    constructor(partial: Partial<PostEntity>) {
        Object.assign(this, partial);
    }

}