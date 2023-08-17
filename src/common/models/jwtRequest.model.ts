import { UserEntity } from "src/modules/users/entities/users.entity";

export interface JwtRequest extends Request {
    user: UserEntity;
}