import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(1)
    maxStudents: number
}
