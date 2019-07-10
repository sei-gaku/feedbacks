import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { CurrentUser } from "src/tokens/current-user.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, we need the incoming request content
    const { req } = GqlExecutionContext.create(context).getContext();

    // Then, we can read the roles in the Nest's metadata set
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (!roles || !roles.includes("admin")) {
      return true;
    }

    const authorization = req && req.headers && req.headers.authorization;

    if (!authorization) {
      return false;
    }

    const matches = /^Bearer (.+)$/.exec(authorization);

    if (!matches || !matches[1]) {
      return false;
    }

    try {
      const currentUser: CurrentUser = await this.jwtService.verifyAsync(
        matches[1],
      );

      return currentUser.isAdmin;
    } catch {
      return false;
    }
  }
}
