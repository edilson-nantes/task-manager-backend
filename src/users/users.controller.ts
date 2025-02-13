import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnLoginDto } from 'src/login/dto/return-login.dto';

@Controller('api/users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post('/register')
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUser: CreateUserDto): Promise<ReturnLoginDto> {
        return this.usersService.createUser(createUser);
    }
    
}
