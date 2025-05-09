import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'max_students' })
  maxStudents: number;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Student, (student) => student.course)
  students: Student[];
}