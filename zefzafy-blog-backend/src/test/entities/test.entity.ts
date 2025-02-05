import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "tests"})
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title : string;

 @Column('simple-json', { nullable: true })
  images: { secure_url: string; public_id: string }[];
}
