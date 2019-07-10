import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

import { EmployeeEntity } from "./employees/employee.entity";
import { EmployeesModule } from "./employees/employees.module";
import { ReviewEntity } from "./reviews/review.entity";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, ReviewEntity]),
    TypeOrmModule.forRoot({
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
    ReviewsModule,
    EmployeesModule,
  ],
})
export class AppModule {}
