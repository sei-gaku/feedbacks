import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";
import { EmployeeEntity } from "../employees/employee.entity";
import { ReviewEntity } from "./review.entity";
import { ReviewsResolver } from "./reviews.resolver";
import { ReviewsService } from "./reviews.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ReviewEntity, EmployeeEntity]),
  ],
  providers: [ReviewsResolver, ReviewsService],
})
export class ReviewsModule {}
