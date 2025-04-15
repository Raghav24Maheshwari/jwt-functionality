import { IsEmail, IsEnum } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
  }
  

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  @IsEnum(Role)
  role: Role;

  @Column('bigint')
  timestamp: number;
}
