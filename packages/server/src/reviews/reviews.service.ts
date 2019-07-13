import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthService } from "../auth/auth.service";
import { CurrentUser } from "../auth/current-user.interface";
import { EmployeeEntity } from "../employees/employee.entity";
import { CreateReviewInput } from "./dto/create-review.input";
import { ReviewKind } from "./dto/review-kind.input";
import { UpdateReviewInput } from "./dto/update-review.input";
import { ReviewEntity } from "./review.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly authService: AuthService,
  ) {}

  public async findAll(id: number, kind: ReviewKind): Promise<ReviewEntity[]> {
    const currentUser = await this.currentUser();

    if (!currentUser.isAdmin) {
      throw new UnauthorizedException();
    }

    switch (kind) {
      case ReviewKind.ABOUT: {
        return this.reviewRepository.find({
          relations: ["target", "writer", "assignees"],
          where: { target: id },
        });
      }

      case ReviewKind.WRITTEN_BY: {
        return this.reviewRepository.find({
          relations: ["target", "writer", "assignees"],
          where: { writer: id },
        });
      }
    }
  }

  public async findById(id: number): Promise<ReviewEntity | null> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ["target", "writer", "assignees"],
    });

    return review || null;
  }

  public async create(review: CreateReviewInput): Promise<boolean> {
    const currentUser = await this.authService.geCurrentUser();

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    const [target, writer] = await Promise.all([
      this.employeeRepository.findOne(review.targetId),
      this.employeeRepository.findOne(currentUser.id),
    ]);

    if (!target) {
      throw new NotFoundException(review.targetId);
    }

    if (!writer) {
      throw new NotFoundException(currentUser.id);
    }

    await this.reviewRepository.save({
      content: review.content,
      target,
      writer,
    });

    return true;
  }

  public async update(id: number, review: UpdateReviewInput): Promise<boolean> {
    const currentReview = await this.reviewRepository.findOne(id);

    if (!currentReview) {
      throw new NotFoundException(id);
    }

    await this.reviewRepository.save({
      ...currentReview,
      content: review.content,
    });

    return true;
  }

  private async currentUser(): Promise<CurrentUser> {
    const currentUser = await this.authService.geCurrentUser();

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    return currentUser;
  }
}
