import { IsString, IsNotEmpty, IsEmail} from 'class-validator';


export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    email: string;
}
