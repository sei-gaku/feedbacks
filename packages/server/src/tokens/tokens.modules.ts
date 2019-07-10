import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmployeeEntity } from "../employees/employee.entity";
import { TokensResolver } from "./tokens.resolver";
import { TokensService } from "./tokens.service";

@Module({
  imports: [
    // TODO: Move the key into a config file
    JwtModule.register({ secret: "super!secret-salt" }),
    TypeOrmModule.forFeature([EmployeeEntity]),
  ],
  providers: [TokensResolver, TokensService],
})
export class TokensModule {}
