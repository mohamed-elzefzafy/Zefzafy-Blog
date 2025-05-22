import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { JwtPayloadType } from 'src/common/types';
import { Roles } from 'src/auth/decorator/Roles.decorator';
import { UserRoles } from 'src/common/enums/roles.enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService: PostService,
    // private readonly userService : UserService,
  ) {}
  public async create(
    createCommentDto: CreateCommentDto,
    user: JwtPayloadType,
    postId: number,
  ) {
    const post = await this.postService.findOne(postId);
    const comment = this.commentRepository.create({
      ...createCommentDto,
      post: { id: post.id },
      user: { id: user.id },
    });

    await this.commentRepository.save(comment);
    return comment;
  }

  async findAll(page: number, limit: number) {
    const pageNumber = Math.max(page, 1);
    const limitNumber = Math.max(limit, 1);

    const skip = (pageNumber - 1) * limitNumber;
    const [comments, total] = await this.commentRepository.findAndCount({
      skip,
      take: limitNumber,
      relations : {post :true}
    });

    const pagesCount = Math.ceil(total / limitNumber);
    return {
      comments,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pagesCount,
      },
    };
  }

  public async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { post: true, user: true },
    });
    if (!comment) throw new NotFoundException('comment not found');
    return comment;
  }

  public async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user: JwtPayloadType,
    postId: number,
  ) {
    const comment = await this.findOne(id);

    if (comment.user.id !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to update this comment',
      );
    }

    if (!comment) throw new NotFoundException('comment not found');
    const post = await this.postService.findOne(postId);
    console.log(post);

    const commentExist = post.comments.find((com) => com.id === comment.id);
    if (!commentExist) throw new NotFoundException('comment not found');

    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  public async remove(id: number, user: JwtPayloadType) {
    const comment = await this.findOne(id);
    if (user.role === UserRoles.USER) {
      if (comment.user.id !== user.id) {
        throw new ForbiddenException(
          'You are not authorized to update this comment',
        );
      }
    }
    await this.commentRepository.remove(comment);
    return { message: `Comment with id (${id}) was removed` };
  }

  async removeByAdmin(id: number) {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
    return { message: `Comment with id (${id}) was removed by admin` };
  }

  async getCommentsCount() {
    return this.commentRepository.count();
  }
}
