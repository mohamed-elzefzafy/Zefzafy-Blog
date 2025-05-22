import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Put,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from 'src/auth/decorator/Roles.decorator';
import { UserRoles } from 'src/common/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtPayloadType } from 'src/common/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { PAGE_LIMIT, PAGE_LIMIT_ADMIN } from 'src/common/constants';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser('user') user: JwtPayloadType,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId: number = user.id;
    return this.postService.create(createPostDto, userId, file);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('search') search: string = '',
    @Query('category') category: string = '',
    @Query('user') user: string = '',
  ) {
    const limit  = PAGE_LIMIT;
    return this.postService.findAll({ page, limit, search , category , user});
  }

  @Get("admin")
  findAllAdmin(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('search') search: string = '',
    @Query('category') category: string = '',
    @Query('user') user: string = '',
  ) {
    const limit  = PAGE_LIMIT_ADMIN;
    return this.postService.findAll({ page, limit, search , category , user});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Get('category-posts/:categoryId')
  findCtegoryPosts(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.postService.findCtegoryPosts(categoryId);
  }

  @Patch(':id')
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser("user") user: JwtPayloadType,
    @UploadedFile() file : Express.Multer.File
  ) {
    return this.postService.update(id, updatePostDto , user , file);
  }


  @Delete(':id')
  @Roles([UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  remove(@Param('id' , ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }

  @Put('like-post/:id')
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  toggleLikePost(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser("user") user: JwtPayloadType,
  ) {
    return this.postService.toggleLikePost(id , user);
  }

  @Get("getPostsCount")
    @Roles([UserRoles.ADMIN])
  getPostsCount(){
    return this.postService.getPostsCount();
  }

}
