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
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Roles } from 'src/auth/decorator/Roles.decorator';
import { UserRoles } from 'src/common/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtPayloadType } from 'src/common/types';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser('user') user: JwtPayloadType,
  ) {
    return this.commentService.create(createCommentDto, user);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser('user') user: JwtPayloadType,
  ) {
    return this.commentService.update(id, updateCommentDto , user);
  }

  @Delete(':id')
  @Roles([UserRoles.USER, UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number ,  @CurrentUser('user') user: JwtPayloadType) {
    return this.commentService.remove(id , user);
  }
}
