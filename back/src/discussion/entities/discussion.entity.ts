import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class DiscussionEntity {

    @ApiProperty({name: 'id', description: 'Unique identifier in the database', example: '61a13d908efa895f56ee120e'})
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({name: 'title', description: 'Title of the discussion', example: 'My first discussion !!!!'})
    @Expose()
    @Type(() => String)
    title: string;

    @ApiProperty({name: 'creationDate', description: 'Date of the creation of the discussion', example: '28/11/2021'})
    @Expose()
    @Type(() => String)
    creationDate: string;

    @ApiProperty({name: 'author', description: 'The author of the discussion', example: 'xXSasukedu95Xx'})
    @Exclude()
    @Type(() => String)
    author: string;

    @ApiProperty({name: 'responses', description: 'the number of responses in the discussion', example: '5'})
    @Exclude()
    @Type(() => String)
    responses: number;

    constructor(partial: Partial<DiscussionEntity>) {
        Object.assign(this, partial);
    }

}