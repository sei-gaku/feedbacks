import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

import { AuthGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { EmployeeEntity } from "./employees/employee.entity";
import { EmployeesModule } from "./employees/employees.module";
import { ReviewEntity } from "./reviews/review.entity";
import { ReviewsModule } from "./reviews/reviews.module";
import { TokensModule } from "./tokens/tokens.modules";

@Module({
  imports: [
    // TODO: Move the key into a config file
    JwtModule.register({ secret: "super!secret-salt" }),
    TypeOrmModule.forFeature([EmployeeEntity, ReviewEntity]),
    TypeOrmModule.forRoot({
      database: "db.sqlite",
      entities: [path.join(__dirname, "**/**.entity{.ts,.js}")],
      synchronize: true,
      type: "sqlite",
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
      // This will add the request object to the GrpahQL Context
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      playground: true,
    }),

    AuthModule,
    ReviewsModule,
    EmployeesModule,
    TokensModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
