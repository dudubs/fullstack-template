import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  secretToken!: string;

  @Column()
  timeout!: number;

  @ManyToOne(() => User, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  user!: User | null;
}
