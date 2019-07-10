import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

import { EmployeesModule } from "./employees/employees.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      database: "db.sqlite",
      entities: [path.join(__dirname, "**/**.entity{.ts,.js}")],
      synchronize: true,
      type: "sqlite",
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
      installSubscriptionHandlers: true,
      playground: true,
    }),
    EmployeesModule,
  ],
})
export class AppModule {}
