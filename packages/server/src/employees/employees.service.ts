import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BCryptService } from "../bcrypt/bcrypt.service";
import { CreateEmployeeInput } from "./dto/create-employee.input";
import { UpdateEmployeeInput } from "./dto/update-employee.input";
import { EmployeeEntity } from "./employee.entity";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly bcryptService: BCryptService,
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

  public async create(employee: CreateEmployeeInput): Promise<boolean> {
    await this.employeeRepository.save({
      bio: employee.bio,
      email: employee.email,
      firstName: employee.firstName,
      isAdmin: employee.isAdmin,
      lastName: employee.lastName,
      password: await this.bcryptService.encrypt(employee.password),
    });

    return true;
  }

  public async update(
    id: number,
    employee: UpdateEmployeeInput,
  ): Promise<boolean> {
    const currentEmployee = await this.employeeRepository.findOne(id);

    if (!currentEmployee) {
      throw new NotFoundException(id);
    }

    await this.employeeRepository.save({
      bio: employee.bio,
      firstName: employee.firstName,
      id,
      isAdmin: employee.isAdmin,
      lastName: employee.lastName,
    });

    return true;
  }

  public async delete(id: number): Promise<boolean> {
    await this.employeeRepository.delete(id);

    return true;
  }
}
