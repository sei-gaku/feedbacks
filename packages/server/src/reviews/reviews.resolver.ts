import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Role } from "../auth/role.decorator";
import { ReviewInput } from "./dto/review.input";
import { ReviewModel } from "./review.model";
import { ReviewsService } from "./reviews.service";

@Resolver(ReviewModel)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(_ => [ReviewModel], { name: "reviews" })
  public async getReviews(): Promise<ReviewModel[]> {
    return this.reviewsService.findAll();
  }

  @Query(_ => ReviewModel, { nullable: true, name: "review" })
  public async getReview(@Args("id") id: number): Promise<ReviewModel | null> {
    return this.reviewsService.findById(id);
  }

  @Role("admin")
  @Mutation(_ => Boolean)
  public async createReview(
    @Args("review") review: ReviewInput,
  ): Promise<boolean> {
    return this.reviewsService.create(review);
  }

  @Role("admin")
  @Mutation(_ => Boolean)
  public async updateReview(
    @Args("id") id: number,
    @Args("review") review: ReviewInput,
  ): Promise<boolean> {
    return this.reviewsService.update(id, review);
  }
}
