import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    // Thay vì request.user, bạn sử dụng request.user từ Passport (hoặc từ chiến lược xác thực JWT)
    const user = request.user;

    return key ? user?.[key] : user;
  },
);
