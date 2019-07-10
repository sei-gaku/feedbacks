import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EmployeeInput } from "./dto/employee.input";
import { Employee } from "./employee.entity";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  public async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  public async findById(id: number): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOne(id);

    return employee || null;
  }

  public async create(employee: EmployeeInput): Promise<Employee> {
    return this.employeeRepository.save({
      bio: employee.bio,
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
  }

  public async update(id: number, employee: EmployeeInput): Promise<Employee> {
    const currentEmployee = await this.employeeRepository.findOne(id);

    if (!currentEmployee) {
      throw new NotFoundException(id);
    }

    return this.employeeRepository.save({
      bio: employee.bio,
      email: employee.email,
      firstName: employee.firstName,
      id,
      lastName: employee.lastName,
    });
  }

  public async delete(id: number): Promise<boolean> {
    await this.employeeRepository.delete(id);

    return true;
  }
}
