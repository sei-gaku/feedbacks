import { IsNotEmpty, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GenerateTokenInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  public email!: string;

  @Field()
  @IsNotEmpty()
  public password!: string;
}
