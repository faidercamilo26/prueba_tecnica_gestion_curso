import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn, RelationId } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
@Index(['course', 'active'])
@Index(['email'], { unique: true, where: 'active = TRUE' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @RelationId((student: Student) => student.course)
  courseId: number;
}