import { IsEmail, IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    rut: string;

    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    birthdate: Date;
}
