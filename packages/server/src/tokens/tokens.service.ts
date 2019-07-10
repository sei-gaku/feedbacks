import {
  Inject,
  Injectable,
  NotFoundException,
  Request,
  Scope,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EmployeeEntity } from "../employees/employee.entity";
import { CurrentUser } from "./current-user.interface";
import { GenerateTokenInput } from "./dto/generate-token.input";
import { TokenModel } from "./tokens.model";

@Injectable({ scope: Scope.REQUEST })
export class TokensService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async generate(credentials: GenerateTokenInput): Promise<TokenModel> {
    const user = await this.employeeRepository.findOne({
      where: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (!user) {
      throw new NotFoundException(credentials.email);
    }

    const userSubSet: CurrentUser = {
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const content = this.jwtService.sign(userSubSet);

    return { content, ...userSubSet };
  }
}
