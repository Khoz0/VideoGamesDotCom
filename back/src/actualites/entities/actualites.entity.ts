import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class ActualitesEntity {

    @ApiProperty({name: 'id', description: 'Unique identifier in the database', example: '61a13d908efa895f56ee120e'})
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({name: 'title', description: 'Title of the actualites', example: 'My first actualites !!!!'})
    @Expose()
    @Type(() => String)
    title: string;

    @ApiProperty({name: 'text', description: 'Text of the actualites', example: '28/11/2021'})
    @Expose()
    @Type(() => String)
    text: string;

    @ApiProperty({name: 'Date of the creation of the actualites', description: '28/11/2021', example: ''})
    @Expose()
    @Type(() => String)
    creationDate: string;

    @ApiProperty({name: 'author', description: 'The author of the actualites', example: 'xXSasukedu95Xx'})
    @Expose()
    @Type(() => String)
    author: string;

    constructor(partial: Partial<ActualitesEntity>) {
        Object.assign(this, partial);
    }

}