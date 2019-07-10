import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { EmployeeInput } from "./dto/employee.input";
import { EmployeeModel } from "./employee.model";
import { EmployeesService } from "./employees.service";

@Resolver(EmployeeModel)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(_ => [EmployeeModel], { name: "employees" })
  public async getEmployees(): Promise<EmployeeModel[]> {
    return this.employeesService.findAll();
  }

  @Query(_ => EmployeeModel, { nullable: true, name: "employee" })
  public async getEmployee(
    @Args("id") id: number,
  ): Promise<EmployeeModel | null> {
    return this.employeesService.findById(id);
  }

  @Mutation(_ => Boolean)
  public async createEmployee(
    @Args("employee") employee: EmployeeInput,
  ): Promise<boolean> {
    return this.employeesService.create(employee);
  }

  @Mutation(_ => Boolean)
  public async updateEmployee(
    @Args("id") id: number,
    @Args("employee") employee: EmployeeInput,
  ): Promise<boolean> {
    return this.employeesService.update(id, employee);
  }

  @Mutation(_ => Boolean)
  public async deleteEmployee(@Args("id") id: number): Promise<boolean> {
    return this.employeesService.delete(id);
  }
}
