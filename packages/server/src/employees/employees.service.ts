import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EmployeeInput } from "./dto/employee.input";
import { EmployeeEntity } from "./employee.entity";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  public async findAll(): Promise<EmployeeEntity[]> {
    return this.employeeRepository.find({
      relations: ["writtenReviews", "targetedReviews", "assignedReviews"],
    });
  }

  public async findById(id: number): Promise<EmployeeEntity | null> {
    const employee = await this.employeeRepository.findOne(id, {
      relations: ["writtenReviews", "targetedReviews", "assignedReviews"],
    });

    return employee || null;
  }

  public async create(employee: EmployeeInput): Promise<boolean> {
    await this.employeeRepository.save({
      bio: employee.bio,
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
    });

    return true;
  }

  public async update(id: number, employee: EmployeeInput): Promise<boolean> {
    const currentEmployee = await this.employeeRepository.findOne(id);

    if (!currentEmployee) {
      throw new NotFoundException(id);
    }

    await this.employeeRepository.save({
      bio: employee.bio,
      email: employee.email,
      firstName: employee.firstName,
      id,
      lastName: employee.lastName,
    });

    return true;
  }

  public async delete(id: number): Promise<boolean> {
    await this.employeeRepository.delete(id);

    return true;
  }
}
