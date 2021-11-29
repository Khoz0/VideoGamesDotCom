import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {CreateDiscussionDto} from "./create-discussion.dto";

export class UpdateDiscussionDto extends PartialType(CreateDiscussionDto) {
    @ApiProperty({
        name: 'title',
        description: "Title of the discussions",
        example: "My first discussions !!!!"
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        name: 'creationDate',
        description: "Date of the creation of the discussions",
        example: "28/11/2021"
    })
    @IsString()
    @IsNotEmpty()
    creationDate: string;

    @ApiProperty({
        name: 'author',
        description: "The author of the discussions",
        example: "xXSasukedu95Xx"
    })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        name: 'responses',
        description: "the number of responses in the discussions",
        example: "5"
    })
    @IsNumber()
    @IsNotEmpty()
    responses: number
}