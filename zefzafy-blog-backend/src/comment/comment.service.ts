import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { JwtPayloadType } from 'src/common/types';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService : PostService,
    // private readonly userService : UserService,
  ){}
  public async create(createCommentDto: CreateCommentDto , user : JwtPayloadType) {
    const post = await this.postService.findOne(createCommentDto.post);
   const comment = this.commentRepository.create({...createCommentDto , post : {id : post.id} , user : {id : user.id}});

    await this.commentRepository.save(comment);
    return comment;
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
