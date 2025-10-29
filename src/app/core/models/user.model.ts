export interface User {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly role: Role;
}

export enum Role {
    User,
    Admin
}

export interface UpdateUser {
    readonly firstName?: string;
    readonly lastName?: string;
}
