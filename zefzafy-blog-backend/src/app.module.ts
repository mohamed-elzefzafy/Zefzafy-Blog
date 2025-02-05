import { BadRequestException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { TestModule } from './test/test.module';
import * as multer from 'multer';
import { TestEntity } from './test/entities/test.entity';
import { LoggerSetupModule } from './common/logger-module/logger.Module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entities/category.entity';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entities/post.entity';



@Module({
  imports:
   [UsersModule , TypeOrmModule.forRootAsync({
    imports: [ConfigModule], 
    inject : [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      url: configService.get<string>('DATABASE_URL'), // Neon database URL
      entities: [UserEntity , TestEntity , CategoryEntity , PostEntity], // Add your entities here
      synchronize: true, // Disable in production to avoid unintended schema changes
    }),
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  CloudinaryModule,
  MulterModule.register({
    storage: multer.memoryStorage(), // Store files in memory
  }),
  LoggerSetupModule,
  MailerModule.forRootAsync({
    inject : [ConfigService],
    useFactory : (config: ConfigService)=> {
      return {
     transport : {
     service : "gmail" ,
     auth : {
       user : config.get<string>('EMAIL_USERNAME'),
       pass : config.get<string>('EMAIL_PASSWORD')
       }
     }
      }
    }
  }),
  TestModule,
  AuthModule,
  CategoryModule,
  PostModule,

],
})
export class AppModule {}



