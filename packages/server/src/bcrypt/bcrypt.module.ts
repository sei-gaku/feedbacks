import { Module } from "@nestjs/common";

import { BCryptService } from "./bcrypt.service";

@Module({
  exports: [BCryptService],
  imports: [],
  providers: [BCryptService],
})
export class BCryptModule {}
