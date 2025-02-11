import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsersModule } from 'src/users/users.module';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
      })
    })
  ],
  providers: [LoginService],
  controllers: [LoginController],
  exports: [LoginService]
})
export class LoginModule {}
