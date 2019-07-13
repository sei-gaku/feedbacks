import { registerEnumType } from "type-graphql";

export enum ReviewKind {
  ABOUT,
  WRITTEN_BY,
}

registerEnumType(ReviewKind, {
  name: "ReviewKind",
});
