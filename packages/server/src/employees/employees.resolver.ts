import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { EmployeeInput } from "./dto/employee.input";
import { Employee } from "./employee.entity";
import { EmployeesService } from "./employees.service";

@Resolver((_: unknown) => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(_ => [Employee], { name: "employees" })
  public async getEmployees(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Query(_ => Employee, { nullable: true, name: "employee" })
  public async getEmployee(@Args("id") id: number): Promise<Employee | null> {
    return this.employeesService.findById(id);
  }

  @Mutation(_ => Employee)
  public async createEmployee(
    @Args("employee") employee: EmployeeInput,
  ): Promise<Employee> {
    return this.employeesService.create(employee);
  }

  @Mutation(_ => Employee)
  public async updateEmployee(
    @Args("id") id: number,
    @Args("employee") employee: EmployeeInput,
  ): Promise<Employee> {
    return this.employeesService.update(id, employee);
  }

  @Mutation(_ => Boolean)
  public async deleteEmployee(@Args("id") id: number): Promise<boolean> {
    return this.employeesService.delete(id);
  }
}
