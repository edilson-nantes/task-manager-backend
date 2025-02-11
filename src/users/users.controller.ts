import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.usersService.createUser(createUser);
    }
    
}
