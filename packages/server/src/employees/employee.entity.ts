import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from "class-validator";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ReviewEntity } from "../reviews/review.entity";

@Entity()
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(64)
  public firstName!: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(64)
  public lastName!: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  public email!: string;

  @Column({ nullable: true, type: "text" })
  @IsOptional()
  @Length(0, 255)
  public bio?: string;

  @Column({ default: false })
  public isAdmin!: boolean;

  @JoinTable()
  @OneToMany(_ => ReviewEntity, review => review.writer)
  public writtenReviews!: ReviewEntity[];

  @JoinTable()
  @OneToMany(_ => ReviewEntity, review => review.target)
  public targetedReviews!: ReviewEntity[];

  @JoinTable()
  @ManyToMany(_ => ReviewEntity)
  public assignedReviews!: ReviewEntity[];
}
