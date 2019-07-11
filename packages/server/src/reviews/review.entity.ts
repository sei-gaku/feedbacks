import { IsNotEmpty, MaxLength } from "class-validator";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EmployeeEntity } from "../employees/employee.entity";

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(_ => EmployeeEntity, employee => employee.writtenReviews)
  public writer!: EmployeeEntity;

  @ManyToOne(_ => EmployeeEntity, employee => employee.targetedReviews)
  public target!: EmployeeEntity;

  // TODO: Link this column to the feedbacks table
  @JoinTable()
  @ManyToMany(_ => EmployeeEntity, employee => employee.assignedReviews)
  public assignees!: EmployeeEntity[];

  @IsNotEmpty()
  @MaxLength(255)
  @Column()
  public content!: string;
}
