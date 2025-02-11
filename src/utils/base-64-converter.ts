import { LoginPayloadDto } from "src/login/dto/login-payload.dto";

//Converte um token JWT em um payload de login
export const authToLoginPayload = (auth: string): LoginPayloadDto | undefined => {
    const authSplited = auth.split('.');

    if (authSplited.length < 3 || !authSplited[1]) {
        return undefined;
    }

    return JSON.parse(
        Buffer.from(authSplited[1], 'base64').toString('ascii')
    );
}