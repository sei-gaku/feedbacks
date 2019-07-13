import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Int } from "type-graphql";

import { Role } from "../auth/role.decorator";
import { CreateReviewInput } from "./dto/create-review.input";
import { ReviewKind } from "./dto/review-kind.input";
import { UpdateReviewInput } from "./dto/update-review.input";
import { ReviewModel } from "./review.model";
import { ReviewsService } from "./reviews.service";

@Resolver(ReviewModel)
export class ReviewsResolver {
  // TODO: After the feedbacks have been added, we'll need a query returning the assigned reviews
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(_ => ReviewModel, { nullable: true, name: "review" })
  public async getReview(
    @Args({ name: "id", type: () => Int }) id: number,
  ): Promise<ReviewModel | null> {
    return this.reviewsService.findById(id);
  }

  @Query(_ => [ReviewModel], { name: "reviews" })
  public async getReviews(
    @Args({ name: "id", type: () => Int }) id: number,
    @Args({ name: "kind", type: () => ReviewKind }) kind: ReviewKind,
  ): Promise<ReviewModel[]> {
    return this.reviewsService.findAll(id, kind);
  }

  @Role("admin")
  @Mutation(_ => Boolean)
  public async createReview(
    @Args("review") review: CreateReviewInput,
  ): Promise<boolean> {
    return this.reviewsService.create(review);
  }

  @Role("admin")
  @Mutation(_ => Boolean)
  public async updateReview(
    @Args({ name: "id", type: () => Int }) id: number,
    @Args("review") review: UpdateReviewInput,
  ): Promise<boolean> {
    return this.reviewsService.update(id, review);
  }
}
