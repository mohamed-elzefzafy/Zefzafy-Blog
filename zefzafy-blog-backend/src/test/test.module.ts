import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './entities/test.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports :[TypeOrmModule.forFeature([TestEntity]) , CloudinaryModule],
})
export class TestModule {}
