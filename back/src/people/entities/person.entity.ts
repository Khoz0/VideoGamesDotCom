import {Exclude, Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class PersonEntity {

    @ApiProperty({name: 'id', description: 'Unique identifier in the database', example: '61a13d908efa895f56ee120e'})
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({name: 'firstname', description: 'Firstname', example: 'Jean'})
    @Expose()
    @Type(() => String)
    firstname: string;

    @ApiProperty({name: 'lastname', description: 'Lastname', example: 'Durand'})
    @Expose()
    @Type(() => String)
    lastname: string;

    @ApiProperty({name: 'pseudo', description: 'Pseudo', example: 'xXSasukedu95Xx'})
    @Expose()
    @Type(() => String)
    pseudo: string;

    @ApiProperty({name: 'mail', description: 'Mail', example: 'jean.durand@undefined.com'})
    @Expose()
    @Type(() => String)
    mail: string;

    @ApiProperty({name: 'password', description: 'Password', example: ''})
    @Type(() => String)
    password: string;


}
