import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, SignupDto } from "./dto";
import * as argon from 'argon2' // argon is used to encrypt the data(here for password)
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }


  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) {
      throw new ForbiddenException("Credentials incorrect")
    }

    const passwordMatch = await argon.verify(user.hash, dto.password) //compare password

    if (!passwordMatch) {
      throw new ForbiddenException("Credentials incorrect")

    }

    return this.signToken(user.id, user.email)
    // delete user.hash // TODO: improve this
    // return user
  }

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password)
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        firstName: dto.firstName,
        lastName: dto.lastName
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    })
    // return user
    return this.signToken(user.id, user.email)
    // TODO: DB EXCEPTION HANDLER
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email: email
    }
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '30m', // 3o minutes
      secret: this.config.get('JWT_SECRET_KEY')
    })
    return { access_token: access_token }
  }
}
