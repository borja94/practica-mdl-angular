import { Role } from './role.model';

export interface Token {
    token: string;
    role: Role;
    creationDate: number;
}
