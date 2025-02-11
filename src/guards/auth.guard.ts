import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginPayloadDto } from "src/login/dto/login-payload.dto";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    //Verifica se o usuário está autenticado
    async canActivate(context: ExecutionContext): Promise<boolean> {
        //Obtém a requisição
        const request = context.switchToHttp().getRequest();
        
        //Obtém o cabeçalho de autorização e verifica se ele existe
        const { authorization } = request.headers;
        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        //Verifica se o token é válido
        let loginPayload: LoginPayloadDto;
        try {
            loginPayload = await this.jwtService.verify(authorization, {
                secret: process.env.JWT_SECRET
            });
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        //Adiciona o payload do token à requisição e verifica se o ID do usuário é válido
        request.user = loginPayload;
        if (!loginPayload?.id) {
            throw new UnauthorizedException('Invalid JWT payload');
        }

        return true;
    }
}