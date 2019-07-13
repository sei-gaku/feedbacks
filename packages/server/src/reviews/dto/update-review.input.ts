import { IsNotEmpty, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateReviewInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  public content!: string;
}
