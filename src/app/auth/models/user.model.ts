export interface User {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
}

export interface UpdateUser {
    readonly firstName?: string;
    readonly lastName?: string;
}
