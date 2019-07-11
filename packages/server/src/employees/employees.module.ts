import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BCryptModule } from "../bcrypt/bcrypt.module";
import { EmployeeEntity } from "./employee.entity";
import { EmployeesResolver } from "./employees.resolver";
import { EmployeesService } from "./employees.service";

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity]), BCryptModule],
  providers: [EmployeesResolver, EmployeesService, EmployeeEntity],
})
export class EmployeesModule {}
