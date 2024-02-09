import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {

  @UseGuards(AuthGuard('jwt-auth'))
  @Get('me')
  getMe(@Req() req: Request) {
    // console.log({ user: req.user }, 'user.....')
    return req.user
  }
}
