import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { currentUser } from 'src/auth/decorator';

@Controller('users')
export class UsersController {

  @UseGuards(AuthGuard('jwt-auth'))
  @Get('me')
  getMe(@currentUser() currentUser: User) {
    // console.log({ user: req.user }, 'user.....')
    return currentUser
  }
}
