import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";

import { ReviewModel } from "../reviews/review.model";

@ObjectType()
export class EmployeeModel {
  @Field(_ => Int)
  public id!: number;

  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  public firstName!: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  public lastName!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  public email!: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  public bio?: string;

  @Field()
  public isAdmin!: boolean;

  @Field(_ => [ReviewModel], { nullable: true })
  public writtenReviews!: ReviewModel[];

  @Field(_ => [ReviewModel], { nullable: true })
  public targetedReviews!: ReviewModel[];

  @Field(_ => [ReviewModel], { nullable: true })
  public assignedReviews!: ReviewModel[];
}
