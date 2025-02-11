import { UserEntity } from "src/users/entities/user.entity";

export class LoginPayloadDto {
    id: number;
    name: string;
    email: string;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}