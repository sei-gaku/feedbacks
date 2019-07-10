import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TokenModel {
  @Field()
  @IsNotEmpty()
  public content!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @Field()
  public isAdmin!: boolean;
}
