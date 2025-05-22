import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Roles } from 'src/auth/decorator/Roles.decorator';
import { UserRoles } from 'src/common/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtPayloadType } from 'src/common/types';
import { PAGE_LIMIT_ADMIN } from 'src/common/constants';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser('user') user: JwtPayloadType,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentService.create(createCommentDto, user, postId);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = `${PAGE_LIMIT_ADMIN}`,
  ) {
    return this.commentService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id/:postId')
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser('user') user: JwtPayloadType,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentService.update(id, updateCommentDto, user, postId);
  }

  @Delete(':id')
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('user') user: JwtPayloadType,
  ) {
    return this.commentService.remove(id, user);
  }

  @Delete('admin/:id')
  @Roles([UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  removeByAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.removeByAdmin(id);
  }

  // @Get('getCommentsCount')
  // @Roles([UserRoles.ADMIN])
  // getPostsCount() {
  //   return this.commentService.getCommentsCount();
  // }
}
