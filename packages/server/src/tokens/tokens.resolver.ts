import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { GenerateTokenInput } from "./dto/generate-token.input";
import { TokenModel } from "./tokens.model";
import { TokensService } from "./tokens.service";

@Resolver(TokenModel)
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Mutation(_ => TokenModel, { name: "login" })
  public async generateToken(
    @Args("credentials") credentials: GenerateTokenInput,
  ): Promise<TokenModel> {
    return this.tokensService.generate(credentials);
  }
}
