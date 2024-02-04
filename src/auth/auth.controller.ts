import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from 'express'
import { AuthDto, SignupDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() body: SignupDto) {
    console.log({ body })
    return this.authService.signup(body)
  }

  @Post('signin')
  signin(@Body() body: AuthDto) {
    return this.authService.signin(body)
  }
}
