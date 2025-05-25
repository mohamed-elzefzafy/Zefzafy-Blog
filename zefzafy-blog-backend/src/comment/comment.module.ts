import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from 'src/post/post.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), JwtModule, PostModule , UsersModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports:[CommentService]
})
export class CommentModule {}
