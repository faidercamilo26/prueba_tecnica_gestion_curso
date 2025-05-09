import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Course } from './courses/entities/course.entity';
import { Student } from './students/entities/student.entity';
import { ErrorInterceptor } from './common/error.interceptor';
import { CacheModule } from '@nestjs/cache-manager';




@Module({
  imports: [
    CacheModule.register({ isGlobal: true}),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Course, Student],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CoursesModule, 
    StudentsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
