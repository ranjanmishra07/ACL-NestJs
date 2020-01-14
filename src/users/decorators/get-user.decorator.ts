import { createParamDecorator } from '@nestjs/common';
import { Users } from '../users.entity';

export const GetUser = createParamDecorator((data, req): Users => {
  return req.user;
});
