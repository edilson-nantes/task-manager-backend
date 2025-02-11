import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginPayloadDto } from "src/login/dto/login-payload.dto";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        let loginPayload: LoginPayloadDto;
        try {
            loginPayload = await this.jwtService.verify(authorization, {
                secret: process.env.JWT_SECRET
            });
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = loginPayload;

        if (!loginPayload?.id) {
            throw new UnauthorizedException('Invalid JWT payload');
        }

        return true;
    }
}