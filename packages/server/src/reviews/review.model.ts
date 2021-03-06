import { IsNotEmpty, MaxLength } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";

import { EmployeeModel } from "../employees/employee.model";

@ObjectType()
export class ReviewModel {
  @Field(_ => Int)
  public id!: number;

  @Field(_ => EmployeeModel)
  public writer!: EmployeeModel;

  @Field(_ => EmployeeModel)
  public target!: EmployeeModel;

  @Field(_ => [EmployeeModel], { nullable: true })
  public assignees!: EmployeeModel[];

  @IsNotEmpty()
  @MaxLength(255)
  @Field()
  public content!: string;
}
