import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment/comment.service';
import { PostService } from './post/post.service';
import { CategoryService } from './category/category.service';
import { UsersService } from './users/users.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly usersService: UsersService,
  ) {}

  @Get('get-counts')
  async getCounts() {
    const postsCount = await this.postService.getPostsCount();
    const categoriesCount = await this.categoryService.getCategoriesCount();
    const usersCount = await this.usersService.getUsersCount();
    const commentsCount = await this.commentService.getCommentsCount();

    return { postsCount, categoriesCount, usersCount, commentsCount };
  }
}
 