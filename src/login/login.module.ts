import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsersModule } from 'src/users/users.module';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
      })
    })
  ],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
