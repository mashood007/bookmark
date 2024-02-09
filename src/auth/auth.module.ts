import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStratery } from "./strategy";

@Module({
  // imports: [PrismaModule],   NOT needed because PrismaModule is global
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStratery]
})
export class AuthModule { }
