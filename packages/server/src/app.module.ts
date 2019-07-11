import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";
import { Repository } from "typeorm";

import { AuthGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { BCryptModule } from "./bcrypt/bcrypt.module";
import { BCryptService } from "./bcrypt/bcrypt.service";
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
      // This will add the request object to the GraphQL context
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      playground: true,
    }),
    AuthModule,
    BCryptModule,
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
export class AppModule {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly bcryptService: BCryptService,
  ) {
    // TODO: Extremely hacky way to set up the initial admin, should be in a seed!
    const adminEmail = "admin@admin.com";

    Promise.all([
      this.bcryptService.encrypt("admin"),
      this.employeeRepository.findOne({ email: adminEmail }),
    ]).then(([password, admin]) => {
      if (!admin) {
        this.employeeRepository.save({
          bio: "An admin",
          email: adminEmail,
          firstName: "admin",
          isAdmin: true,
          lastName: "admin",
          password,
        });
      }
    });
  }
}
