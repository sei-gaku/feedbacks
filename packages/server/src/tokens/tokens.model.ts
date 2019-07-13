import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class TokenModel {
  @Field()
  @IsNotEmpty()
  public token!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @Field(_ => Int)
  @IsNotEmpty()
  public id!: number;

  @Field()
  public isAdmin!: boolean;
}
