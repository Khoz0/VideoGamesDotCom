import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";


export class CreatePersonDto {

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
