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
import { ReviewInput } from "./dto/review.input";
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

  public async findAllWrittenByCurrentUser(): Promise<ReviewEntity[]> {
    const currentUser = await this.currentUser();

    return this.reviewRepository.find({
      relations: ["target", "writer", "assignees"],
      where: { writer: currentUser.id },
    });
  }

  public async findAllAboutCurrentUser(): Promise<ReviewEntity[]> {
    const currentUser = await this.currentUser();

    return this.reviewRepository.find({
      relations: ["target", "writer", "assignees"],
      where: { target: currentUser.id },
    });
  }

  public async findAllWrittenBy(id: number): Promise<ReviewEntity[]> {
    const currentUser = await this.currentUser();

    if (!currentUser.isAdmin) {
      throw new UnauthorizedException();
    }

    return this.reviewRepository.find({
      relations: ["target", "writer", "assignees"],
      where: { writer: id },
    });
  }

  public async findAllAbout(id: number): Promise<ReviewEntity[]> {
    const currentUser = await this.currentUser();

    if (!currentUser.isAdmin) {
      throw new UnauthorizedException();
    }

    return this.reviewRepository.find({
      relations: ["target", "writer", "assignees"],
      where: { writer: id },
    });
  }

  public async findById(id: number): Promise<ReviewEntity | null> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ["target", "writer", "assignees"],
    });

    return review || null;
  }

  public async create(review: ReviewInput): Promise<boolean> {
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

  private async currentUser(): Promise<CurrentUser> {
    const currentUser = await this.authService.geCurrentUser();

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    return currentUser;
  }
}
