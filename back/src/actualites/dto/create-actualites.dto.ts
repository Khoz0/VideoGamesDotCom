import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateActualitesDto {
    @ApiProperty({
        name: 'title',
        description: "Title of the actulites",
        example: "My first actulites !!!!"
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        name: 'Text',
        description: "Text of the actulites",
        example: "28/11/2021"
    })
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty({
        name: 'creationDate',
        description: "Date of the creation of the actulites",
        example: "28/11/2021"
    })
    @IsString()
    @IsNotEmpty()
    creationDate: string;

    @ApiProperty({
        name: 'author',
        description: "The author of the actulites",
        example: "xXSasukedu95Xx"
    })
    @IsString()
    @IsNotEmpty()
    author: string
}