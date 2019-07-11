import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";

@Module({
  exports: [AuthService],
  imports: [
    // TODO: Move the key into a config file
    JwtModule.register({ secret: "super!secret-salt" }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
