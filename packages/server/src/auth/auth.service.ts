import { Inject, Injectable, Scope } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

import { CurrentUser } from "../auth/current-user.interface";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(CONTEXT)
    private readonly context: any,
    private readonly jwtService: JwtService,
  ) {}

  public async geCurrentUser(): Promise<CurrentUser | null> {
    const authorization =
      this.context &&
      this.context.req &&
      this.context.req.headers &&
      this.context.req.headers.authorization;

    if (!authorization) {
      return null;
    }

    const matches = /^Bearer (.+)$/.exec(authorization);

    if (!matches || !matches[1]) {
      return null;
    }

    try {
      const currentUser: CurrentUser = await this.jwtService.verifyAsync(
        matches[1],
      );

      return currentUser;
    } catch {
      return null;
    }
  }
}
