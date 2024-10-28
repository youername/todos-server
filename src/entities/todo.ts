import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user";

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  title: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column({ nullable: true })
  atDate: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ nullable: true })
  color: string;
}
