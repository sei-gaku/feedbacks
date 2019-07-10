import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmployeeEntity } from "./employee.entity";
import { EmployeesResolver } from "./employees.resolver";
import { EmployeesService } from "./employees.service";

@Module({
  exports: [EmployeeEntity],
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [EmployeesResolver, EmployeesService, EmployeeEntity],
})
export class EmployeesModule {}
