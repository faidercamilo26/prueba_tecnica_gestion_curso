import { Module,forwardRef} from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';


@Module({
  imports: [
      TypeOrmModule.forFeature([Student]),
      forwardRef (() => CoursesModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService], 
})
export class StudentsModule {}
