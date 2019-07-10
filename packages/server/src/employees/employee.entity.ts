import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Employee {
  @Field(_ => ID)
  @PrimaryGeneratedColumn()
  public id!: number;

  @IsNotEmpty()
  @MaxLength(64)
  @Field()
  @Column()
  public firstName!: string;

  @IsNotEmpty()
  @MaxLength(64)
  @Field()
  @Column()
  public lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @Field()
  @Column({ unique: true })
  public email!: string;

  @IsOptional()
  @Length(0, 255)
  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  public bio?: string;
}
