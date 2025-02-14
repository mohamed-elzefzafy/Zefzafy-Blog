import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayloadType } from 'src/common/types';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepositry: Repository<PostEntity>,
    @Inject(forwardRef(() => CategoryService))  private readonly categoryService: CategoryService,
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  public async create(
    createPostDto: CreatePostDto,
    userId: number,
    file: Express.Multer.File,
  ) {
    const category = await this.categoryService.findOne(createPostDto.category);
    if (!category) throw new NotFoundException('category not found');

    let image = null;

    if (file) {
      const result = await this.cloudinaryService.uploadImage(file, 'posts');
      image = { secure_url: result.secure_url, public_id: result.public_id };
    }

    const post = this.postRepositry.create({
      ...createPostDto,
      user: { id: userId },
      category: category,
      image: image,
    });

    await this.postRepositry.save(post);
    return post;
  }

  findAll() {
    return this.postRepositry.find({
      relations: { category: true, user: true },
    });
  }

  public async findOne(id: number) {
    const post = await this.postRepositry.findOne({
      where: { id },
      relations: { user: true , likes : true , comments: true }, 
    });
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  public async update(
    id: number,
    updatePostDto: UpdatePostDto,
    user: JwtPayloadType,
    file: Express.Multer.File,
  ) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException('post not found');

    if (post.user.id !== user.id) {
      throw new UnauthorizedException(
        'you cannot update post belong to another user',
      );
    }

    if (updatePostDto.category) {
      const category = await this.categoryService.findOne(
        updatePostDto.category,
      );
      if (!category) throw new NotFoundException('category not found');
    }

    Object.assign(post, updatePostDto);
    if (file) {
      if (post.image !== null) {
        await this.cloudinaryService.removeImage(post.image.public_id);
      }
      const result = await this.cloudinaryService.uploadImage(file, 'posts');
      post.image = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    }
    await this.postRepositry.save(post);
    return post;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  public async findCtegoryPosts(categoryId: number) {
    const category = await this.categoryService.findOne(categoryId);
    console.log('category', category);
    const posts = await this.postRepositry.find({
      where: { category: { id: categoryId } },
      relations: { category: true },
    });
    console.log('posts', posts);

    return posts;
  }

  public async toggleLikePost(id : number , user : JwtPayloadType) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException('post not found');
    // const fullUser = await this.usersService.findOne(user.id);
    console.log(post.likes);
    if (!post.likes) post.likes = [];
    
    if (post.likes.find(like => like.id === user.id)) {
      post.likes = post.likes.filter(like => like.id !== user.id);
    } else {
      post.likes.push({id : user.id} as UserEntity);
    }
    return this.postRepositry.save(post);

  }
}
