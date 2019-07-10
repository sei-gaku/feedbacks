import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { EmployeesModule } from "./employees/employees.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
      installSubscriptionHandlers: true,
      playground: true,
    }),
    EmployeesModule,
  ],
})
export class AppModule {}
