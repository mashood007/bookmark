import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, SignupDto } from "./dto";
import * as argon from 'argon2' // argon is used to encrypt the data(here for password)

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) { }


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

    delete user.hash // TODO: improve this
    return user
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
        firstName: true,
        lastName: true,
        email: true
      }
    })
    return user
    // TODO: DB EXCEPTION HANDLER
  }
}
