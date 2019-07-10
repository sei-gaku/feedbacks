import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Employee {
  @Field(_ => ID)
  public id!: string;

  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;

  @Field()
  public email!: string;

  @Field({ nullable: true })
  public bio?: string;
}
