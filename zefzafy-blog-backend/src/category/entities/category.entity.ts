import { PostEntity } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name : "categeries"})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : "varchar" , length : "20" , nullable : false , unique : true})
    title : string;

   @OneToMany(() => PostEntity , post => post.category)
    posts : PostEntity[];

    @CreateDateColumn()
    createAt : Timestamp

    @UpdateDateColumn()
    updateAt : Timestamp;
}
