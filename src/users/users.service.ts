import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    //Cria um novo usuário
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDto.email)
            .catch(() => undefined);


        //Verifica se o usuário já existe
        if (user) {
            throw new BadRequestException('User already exists');
        }

        //Hash da senha
        const saltOrRounds = 15;
        const hashedPassword = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: hashedPassword
        });
    }

    
    //Busca um usuário pelo email
    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
        });

        if(!user){
            throw new NotFoundException('User not found');
        }

        return user;
    }

    //Busca um usuário pelo ID
    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!user){
            throw new NotFoundException(`User not found`);
        }

        return user;
    }
}
