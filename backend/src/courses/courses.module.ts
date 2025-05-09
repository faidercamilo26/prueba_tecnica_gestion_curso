import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { Course } from './entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'src/students/students.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Student]),
    forwardRef (() => StudentsModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CoursesModule {}
