import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Role } from "../auth/role.decorator";
import { ReviewInput } from "./dto/review.input";
import { ReviewModel } from "./review.model";
import { ReviewsService } from "./reviews.service";

@Resolver(ReviewModel)
export class ReviewsResolver {
  // TODO: After the feedbacks have been added, we'll need a query returning the assigned reviews
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(_ => ReviewModel, { nullable: true, name: "review" })
  public async getReview(@Args("id") id: number): Promise<ReviewModel | null> {
    return this.reviewsService.findById(id);
  }

  @Query(_ => [ReviewModel], { name: "reviewsIWrote" })
  public async getReviewsWrittenByCurrentUser(): Promise<ReviewModel[]> {
    return this.reviewsService.findAllWrittenByCurrentUser();
  }

  @Query(_ => [ReviewModel], { name: "reviewsAboutMe" })
  public async getReviewsAboutCurrentUser(): Promise<ReviewModel[]> {
    return this.reviewsService.findAllAboutCurrentUser();
  }

  @Role("admin")
  @Query(_ => [ReviewModel], { name: "reviewsWrittenBy" })
  public async getReviewsWrittenBy(
    @Args("id") id: number,
  ): Promise<ReviewModel[]> {
    return this.reviewsService.findAllWrittenBy(id);
  }

  @Role("admin")
  @Query(_ => [ReviewModel], { name: "reviewsAbout" })
  public async getReviewsAbout(@Args("id") id: number): Promise<ReviewModel[]> {
    return this.reviewsService.findAllAbout(id);
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
