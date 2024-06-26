import { IsString, MinLength } from 'class-validator'

export class CreateTaskDto {

    @IsString()
    @MinLength(5)
    title: string

    @IsString()
    description: string

    status: boolean
}