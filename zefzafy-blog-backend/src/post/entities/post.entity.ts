import { CategoryEntity } from 'src/category/entities/category.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.posts, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;

  @Column({ type: 'jsonb', nullable: true })
  image: { url: string; public_id: string };

  @Column({ type: 'int', default: 0 })
  reactsLength: number;

  @ManyToMany(() => UserEntity, (user) => user.likedPosts)
  @JoinTable({ name: 'liked_posts' })
  likes: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
