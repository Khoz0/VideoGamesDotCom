import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';
import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
    @ApiProperty({
        name: 'firstname',
        description: "Firstname",
        example: "Jean"
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({
        name: 'lastname',
        description: "Lastname",
        example: "Durand"
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({
        name: 'pseudo',
        description: "Pseudo",
        example: "xXSasukedu95Xx"
    })
    @IsString()
    @IsNotEmpty()
    pseudo: string;

    @ApiProperty({
        name: 'mail',
        description: "Mail",
        example: "jean.durand@undefined.com"
    })
    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @ApiProperty({
        name: 'password',
        description: "password",
        example: "Test123Test"
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}
