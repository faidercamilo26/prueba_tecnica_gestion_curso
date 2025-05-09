import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { CourseService } from '../courses/courses.service'

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @Inject(forwardRef(() => CourseService))
    private courseService: CourseService,
  ){}
  
  async addStudent(studentData: CreateStudentDto): Promise<Student> {
    const course = await this.courseService.finOne();

    if (course.students.length >= course.maxStudents) {
      throw new BadRequestException('Maximum student capacity reached');
    }

    const newStudent = this.studentRepository.create({
      ...studentData,
      course: {id: course.id},
    });

    await this.studentRepository.save(newStudent);
    await this.courseService.invalidateDiversityCache();
    await this.courseService.calculateDiversity(course.id);

    return newStudent;
  }

  async removeStudent(studentId: number): Promise< {message: string }> {
    const result = await this.studentRepository.update(studentId, { active: false });

    if (result.affected === 0) {
      throw new BadRequestException(
        `Estudiante con ID ${studentId} no encontrado`
      );
    }

    await this.courseService.invalidateDiversityCache();

    return {
      message: `Estudiante con ID ${studentId} eliminado del curso exitosamente`
    };
  }

  async getActiveStudents(): Promise<Student[]> {
    const course = await this.courseService.finOne();
    return course.students.filter(student => student.active);
  }

}
