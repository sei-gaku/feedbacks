import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeesResolver } from "./employees.resolver";
import { EmployeesService } from "./employees.service";

import { Employee } from "./employee.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeesResolver, EmployeesService],
})
export class EmployeesModule {}
