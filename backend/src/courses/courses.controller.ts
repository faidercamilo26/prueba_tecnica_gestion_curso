import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { StudentService } from '../students/students.service';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly studentService: StudentService
  ) {}

  @Post()
  create(@Body() courseData: CreateCourseDto) {
    return this.courseService.createCourse(courseData);
  }

  @Get()
  async getCourse() {
    const course = await this.courseService.finOne();
    const diversity = await this.courseService.calculateDiversity(course.id);

    return {
      ...course,
      diversity,
      students: undefined 
    }
  }


  @Patch(':id')
  updateCourse(@Param('id') id:string, @Body() updateData: CreateCourseDto) {
    const courseId = parseInt(id, 10);
    if (isNaN(courseId)) {
      throw new Error('Invalid course ID');
    }
    return this.courseService.updateCourse(courseId,updateData);
  }

  @Delete(':id')
  async removeCourse(@Param('id') id: string) {
    const courseId = parseInt(id, 10);
    return await this.courseService.deleteCourse(courseId);
  }

}
