import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtDecoded = {
  iss: string;
  userId: string;
};

export const JwtUser = createParamDecorator(
  (key: keyof JwtDecoded, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtDecoded;
    return key ? user?.[key] : user;
  },
);
