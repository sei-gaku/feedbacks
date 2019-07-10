import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Auth } from "../auth/auth.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { GenerateTokenInput } from "./dto/generate-token.input";
import { TokenModel } from "./tokens.model";
import { TokensService } from "./tokens.service";

@Resolver(TokenModel)
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Mutation(_ => TokenModel)
  public async generateToken(
    @Args("credentials") credentials: GenerateTokenInput,
  ): Promise<TokenModel> {
    return this.tokensService.generate(credentials);
  }
}
