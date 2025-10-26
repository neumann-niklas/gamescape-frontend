import { Role } from "./role.enum";

export interface User {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly role: Role;
}

export interface UpdateUser {
    readonly firstName?: string;
    readonly lastName?: string;
}
