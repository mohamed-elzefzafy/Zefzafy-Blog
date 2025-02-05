import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ){}
  public async create(createCategoryDto: CreateCategoryDto) {
    let category = await this.categoryRepository.findOneBy({title : createCategoryDto.title});
    
    if (category) throw new BadRequestException("category is exist already")
     category =  this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  public async findAll() {
    return this.categoryRepository.find();
  }

  public async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({id});
    if (!category) throw new NotFoundException("category not found");
    return category;
  }

  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
  const category = await this.findOne(id);
  if (!category) throw new NotFoundException("category not found");
  const existCategory = await this.categoryRepository.findOneBy({title : updateCategoryDto.title});
  if (existCategory) throw new BadRequestException("there's category with this name");
  Object.assign(category, updateCategoryDto);
  return this.categoryRepository.save(category);
  }

  public async remove(id: number) {
   const category = await this.findOne(id);
   if (!category) throw new NotFoundException("category not found");
   await this.categoryRepository.remove(category);
  //  @TODO delete related posts and it's images 
   return {message : `category with id (${id}) was removed`}
  }
}
