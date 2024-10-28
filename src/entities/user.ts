import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import bcrypt from "bcryptjs";
//구조,= 구성,key value 구성가 다르지만 비슷한 역할
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photoBase64: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  studentNum: string;

  @Column({ type: "enum", enum: Gender, nullable: true })
  gender: Gender;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

export default User;
