import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  public firstName!: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  public lastName!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  public email!: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  public bio?: string;

  @Field()
  @IsNotEmpty()
  @Length(0, 64)
  public password!: string;

  @Field()
  public isAdmin!: boolean;
}
