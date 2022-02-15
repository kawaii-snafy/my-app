import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;
}
