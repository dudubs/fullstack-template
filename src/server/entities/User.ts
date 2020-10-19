import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  loginName!: string;

  @Column()
  encrypedPassword!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
