import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    // TODO: Move the key into a config file
    JwtModule.register({ secret: "super!secret-salt" }),
  ],
  providers: [AuthGuard],
})
export class AuthModule {}
