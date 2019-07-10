import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { EmployeeInput } from "./dto/employee.input";
import { EmployeesService } from "./employees.service";
import { Employee } from "./models/employee";

@Resolver((_: unknown) => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(_ => [Employee], { name: "employees" })
  public async getEmployees(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }

  @Query(_ => Employee, { nullable: true, name: "employee" })
  public async getEmployee(@Args("id") id: string): Promise<Employee | null> {
    return await this.employeesService.findById(id);
  }

  @Mutation(_ => Employee)
  public async createEmployee(
    @Args("employee") employee: EmployeeInput,
  ): Promise<Employee> {
    return await this.employeesService.create(employee);
  }

  @Mutation(_ => Employee)
  public async updateEmployee(
    @Args("id") id: string,
    @Args("employee") employee: EmployeeInput,
  ): Promise<Employee> {
    return await this.employeesService.update(id, employee);
  }

  @Mutation(_ => Boolean)
  public async deleteEmployee(@Args("id") id: string): Promise<boolean> {
    return await this.employeesService.delete(id);
  }
}
