import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  public async create(createCategoryDto: CreateCategoryDto) {
    let category = await this.categoryRepository.findOneBy({
      title: createCategoryDto.title,
    });

    if (category) throw new BadRequestException('category is exist already');
    category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  public async findAll() {
    return this.categoryRepository.find();
  }

  public async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('category not found');
    return category;
  }

  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('category not found');
    const existCategory = await this.categoryRepository.findOneBy({
      title: updateCategoryDto.title,
    });
    if (existCategory)
      throw new BadRequestException("there's category with this name");
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  public async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('category not found');
 
   const posts = await this.postService.findCtegoryPosts(id);

   let publicIds =[];
   posts.map(post => {
    if (post.image) {
      publicIds.push(post.image.public_id) ;
    }
   });
   console.log(publicIds);
   
   //TODO: remove images from cloudinary
   await this.categoryRepository.remove(category);
   
   await this.cloudinaryService.removeMultipleImages(publicIds);
    return { message: `category with id (${id}) was removed` };
  }
}
