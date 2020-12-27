import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    this.logger.log({ user: req.user });
    return req.user;
  }
}
