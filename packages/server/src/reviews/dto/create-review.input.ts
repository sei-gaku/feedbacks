import { IsNotEmpty, MaxLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateReviewInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  public content!: string;

  @Field(_ => Int)
  public targetId!: number;
}
