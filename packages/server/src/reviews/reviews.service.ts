import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EmployeeEntity } from "../employees/employee.entity";
import { ReviewInput } from "./dto/review.input";
import { ReviewEntity } from "./review.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  public async findAll(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({
      relations: ["target", "writer", "assignees"],
    });
  }

  public async findById(id: number): Promise<ReviewEntity | null> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ["target", "writer", "assignees"],
    });

    return review || null;
  }

  public async create(review: ReviewInput): Promise<boolean> {
    const target = await this.employeeRepository.findOne(review.targetId);

    if (!target) {
      throw new NotFoundException(review.targetId);
    }

    await this.reviewRepository.save({
      content: review.content,
      target,
    });

    return true;
  }

  public async update(id: number, review: ReviewInput): Promise<boolean> {
    const currentReview = await this.reviewRepository.findOne(id);

    if (!currentReview) {
      throw new NotFoundException(id);
    }

    await this.reviewRepository.save({
      content: review.content,
    });

    return true;
  }
}
