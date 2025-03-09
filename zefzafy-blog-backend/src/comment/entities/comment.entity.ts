import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => PostEntity, (post) => post.comments , {onDelete : "CASCADE"})
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Timestamp;
 
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
 