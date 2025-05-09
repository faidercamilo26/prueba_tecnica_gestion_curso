import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StudentService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('course/students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService
  ) {}

  @Post()
  addStudent(@Body() studentData: CreateStudentDto) {
    return this.studentService.addStudent(studentData);
  }

  @Delete(':id')
  removeStudent(@Param('id') id: string) {
    return this.studentService.removeStudent(Number(id));
  }

  @Get()
  getStudents() {
    return this.studentService.getActiveStudents();
  }
}
