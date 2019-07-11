import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CurrentUser } from "../auth/current-user.interface";
import { BCryptService } from "../bcrypt/bcrypt.service";
import { EmployeeEntity } from "../employees/employee.entity";
import { GenerateTokenInput } from "./dto/generate-token.input";
import { TokenModel } from "./tokens.model";
@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BCryptService,
  ) {}

  public async generate(credentials: GenerateTokenInput): Promise<TokenModel> {
    const user = await this.employeeRepository.findOne({
      where: {
        email: credentials.email,
      },
    });

    if (!user) {
      throw new NotFoundException(credentials.email);
    }

    const passwordsMatch = await this.bcryptService.compare(
      credentials.password,
      user.password,
    );

    // We don't want to be too explicit here
    if (!passwordsMatch) {
      throw new NotFoundException(credentials.email);
    }

    const userSubSet: CurrentUser = {
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    };

    const content = this.jwtService.sign(userSubSet);

    return { content, ...userSubSet };
  }
}
