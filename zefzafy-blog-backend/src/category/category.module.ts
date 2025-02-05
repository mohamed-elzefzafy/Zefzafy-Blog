import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([CategoryEntity]) , JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports : [CategoryService]
})
export class CategoryModule {}
