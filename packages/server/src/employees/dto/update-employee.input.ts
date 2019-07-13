import { IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateEmployeeInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  public firstName!: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  public lastName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  public bio?: string;

  @Field()
  public isAdmin!: boolean;
}
