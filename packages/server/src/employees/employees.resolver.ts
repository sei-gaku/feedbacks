import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Role } from "../auth/role.decorator";
import { CreateEmployeeInput } from "./dto/create-employee.input";
import { UpdateEmployeeInput } from "./dto/update-employee.input";
import { EmployeeModel } from "./employee.model";
import { EmployeesService } from "./employees.service";

@Resolver(EmployeeModel)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Role("admin")
  @Query(_ => [EmployeeModel], { name: "employees" })
  public async getEmployees(): Promise<EmployeeModel[]> {
    return this.employeesService.findAll();
  }

  @Role("admin")
  @Query(_ => EmployeeModel, { nullable: true, name: "employee" })
  public async getEmployee(
    @Args("id") id: number,
  ): Promise<EmployeeModel | null> {
    return this.employeesService.findById(id);
  }

  @Role("admin")
  @Mutation(_ => Boolean)
  public async createEmployee(
    @Args("employee") employee: CreateEmployeeInput,
  ): Promise<boolean> {
    return this.employeesService.create(employee);
  }

  @Role("admin")
  @Mutation(_ => Boolean)
  public async updateEmployee(
    @Args("id") id: number,
    @Args("employee") employee: UpdateEmployeeInput,
  ): Promise<boolean> {
    return this.employeesService.update(id, employee);
  }

  @Role("admin")
  @Mutation(_ => Boolean)
  public async deleteEmployee(@Args("id") id: number): Promise<boolean> {
    return this.employeesService.delete(id);
  }
}
