import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { Student } from '../students/entities/student.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { StudentService } from './../students/students.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CourseService {
  private key: string =  "diversityCache";

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
     @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ){}

  //Como solo puede haber un curso activo primero se inactiva el curso activo antes de crear uno nuevo
  async createCourse(courseData: CreateCourseDto): Promise<Course> {
    await this.courseRepository.update({ active:true }, { active: false});

    const newCourse = this.courseRepository.create(courseData);
    return this.courseRepository.save(newCourse);
  }

  /*Obtener todos los cursos: se filtra por el curso activo, sin embargo,
  si más adelante se quieren manejar más de un curso activo al tirmpo, con este metodo
  se retornarian todos 
  */
  async findAll(): Promise<Course[]> {
    const courses = await this.courseRepository.find({ where: { active: true } });
    if (!courses){
      throw new NotFoundException('No active courses found');
    }

    return courses;
  }


  //Obtener el curso activo
  async finOne(): Promise<Course> {
    const course = await this.courseRepository.findOne({ 
      where: { active: true },
      relations: ['students'], 
    });
    if (!course){
      throw new NotFoundException('No active course found');
    }

    return course;
  }

  //Actualizar un curso
  async updateCourse(courseId: number,updateData: UpdateCourseDto,): Promise<Course> {
    const course = await this.courseRepository.preload({
      id: courseId,
      ...updateData,
    });

    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    return this.courseRepository.save(course);
  }

  /*Borrar un curso con todos sus estudiantes: este metodo usa la eliminacion logica
  lo cual es una buena practica para no eliminar registros de una base de datos, solo
  cambia su valor a false y con la logica implementada en los otros metodos no se muestran
  estos registros
  */

  async deleteCourse(courseId:number){
    const course = await this.courseRepository.findOne({
      where: { active: true, id: courseId },
      relations: ['students'], 
    });

    if (!course){
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    // Cambiar el estado del curso a inactivo
    course.active = false;

    await Promise.all(course?.students.map(async student => {
      await this.studentService.removeStudent(student.id);
    }));

    await this.invalidateDiversityCache();

    return this.courseRepository.save(course);
  }
  

  /* Calcular el indice de diversidad: se realiza este calculo y su respuesta se almacena en una memoria cache
  durante 20 mins lo que nos permite optimizar la consulta sin dejar los datos mucho tiempo almacenados en la cache
  lo que evita que puedan ocurrir errores de obsolencia en los datos
  */
  async calculateDiversity(courseId: number): Promise<number> {

    let diversityCache: number | null = 0;
    const TTL: number = 1_200_000; // 20 minutes in milliseconds

    diversityCache = await this.cacheManager.get(this.key);

    if (diversityCache) {
      return Number(diversityCache);
    }

    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });

    if (!course?.students.length) return 0;

    const domains = new Set<string>();
    course.students.forEach(student => {
      if (student.active) {
        const domain = student.email.split('@')[1]?.toLowerCase();
        if (domain) domains.add(domain);
      }
    });

    diversityCache = Number(
      ((domains.size / course.students.length) * 100).toFixed(2)
    );

    await this.cacheManager.set(this.key, diversityCache, TTL);

    return diversityCache;
  }

  async invalidateDiversityCache(): Promise<void> {
    await this.cacheManager.del(this.key);
  }

}


