import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class DiscussionsEntity {

    @ApiProperty({name: 'id', description: 'Unique identifier in the database', example: '61a13d908efa895f56ee120e'})
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({name: 'title', description: 'Title of the discussions', example: 'My first discussions !!!!'})
    @Expose()
    @Type(() => String)
    title: string;

    @ApiProperty({name: 'creationDate', description: 'Date of the creation of the discussions', example: '28/11/2021'})
    @Expose()
    @Type(() => String)
    creationDate: string;

    @ApiProperty({name: 'author', description: 'The author of the discussions', example: 'xXSasukedu95Xx'})
    @Exclude()
    @Type(() => String)
    author: string;

    @ApiProperty({name: 'responses', description: 'the number of responses in the discussions', example: '5'})
    @Exclude()
    @Type(() => Number)
    responses: number;

    constructor(partial: Partial<DiscussionsEntity>) {
        Object.assign(this, partial);
    }

}