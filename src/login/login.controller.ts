import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/return-login.dto';

@Controller('login')
export class LoginController {

    constructor(
        private readonly loginService: LoginService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async authenticateUser(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
        return await this.loginService.authenticateUser(loginDto);
    }
}
