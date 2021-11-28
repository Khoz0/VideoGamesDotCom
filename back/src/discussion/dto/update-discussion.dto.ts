import {ApiProperty, PartialType} from "@nestjs/swagger";
import {CreatePersonDto} from "../../people/dto/create-person.dto";
import {IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {CreateDiscussionDto} from "./create-discussion.dto";

export class UpdateDiscussionDto extends PartialType(CreateDiscussionDto) {
    @ApiProperty({
        name: 'title',
        description: "Title of the discussion",
        example: "My first discussion !!!!"
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        name: 'creationDate',
        description: "Date of the creation of the discussion",
        example: "28/11/2021"
    })
    @IsString()
    @IsNotEmpty()
    creationDate: string;

    @ApiProperty({
        name: 'author',
        description: "The author of the discussion",
        example: "xXSasukedu95Xx"
    })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        name: 'responses',
        description: "the number of responses in the discussion",
        example: "5"
    })
    @IsNumber()
    @IsNotEmpty()
    responses: number
}