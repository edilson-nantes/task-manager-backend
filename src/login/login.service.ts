import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/return-login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { compare } from 'bcryptjs';
import { LoginPayloadDto } from './dto/login-payload.dto';

@Injectable()
export class LoginService {

    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) {}

    //Autentica um usuário
    async authenticateUser(loginDto: LoginDto): Promise<ReturnLoginDto> {
        //Busca o usuário pelo email
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDto.email)
            .catch(() => undefined);

        //Verifica se o usuário existe e se a senha está correta
        const isMatch = await compare(loginDto.password, user?.password || '');
        if (!user || !isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user)}),
        }
    }
}
