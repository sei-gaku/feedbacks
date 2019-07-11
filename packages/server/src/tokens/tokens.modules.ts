import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BCryptModule } from "../bcrypt/bcrypt.module";
import { EmployeeEntity } from "../employees/employee.entity";
import { TokensResolver } from "./tokens.resolver";
import { TokensService } from "./tokens.service";

@Module({
  imports: [
    // TODO: Move the key into a config file
    JwtModule.register({ secret: "super!secret-salt" }),
    TypeOrmModule.forFeature([EmployeeEntity]),
    BCryptModule,
  ],
  providers: [TokensResolver, TokensService],
})
export class TokensModule {}
