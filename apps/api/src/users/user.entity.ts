import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Role } from '../auth/roles';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(3)
  firstName: string;

  @Column({ nullable: true })
  @IsString()
  lastName: string;

  @Column()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @Column('simple-array')
  @IsEnum(Role)
  @IsOptional()
  roles: Role[];

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<User>) {
    super();

    Object.assign(this, partial);
  }
}
