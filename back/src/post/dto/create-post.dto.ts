import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        name: 'idDiscussion',
        description: "id of the discussion in witch the post appears",
        example: "61a13d908efa895f56hh141f"
    })
    @IsString()
    @IsNotEmpty()
    idDiscussion: string;

    @ApiProperty({
        name: 'author',
        description: "The author of the discussions",
        example: "xXSasukedu95Xx"
    })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        name: 'text',
        description: "the text of the post",
        example: "Hello guys !!!!!"
    })
    @IsString()
    @IsNotEmpty()
    text: string

    @ApiProperty({
        name: 'creationDate',
        description: "Date of the creation of the discussions",
        example: "28/11/2021"
    })
    @IsString()
    @IsNotEmpty()
    creationDate: string;
}