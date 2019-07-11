import { SetMetadata } from "@nestjs/common";

// This simple decorator will push some metadata that will be checked by the Auth guard

export const Role = (...roles: string[]) => SetMetadata("roles", roles);
