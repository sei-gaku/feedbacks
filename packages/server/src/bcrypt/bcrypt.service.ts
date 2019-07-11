import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

const saltRounds = 10;

@Injectable()
export class BCryptService {
  public async encrypt(word: string): Promise<string> {
    return bcrypt.hash(word, saltRounds);
  }

  public async compare(word: string, hash: string): Promise<boolean> {
    return bcrypt.compare(word, hash);
  }
}
