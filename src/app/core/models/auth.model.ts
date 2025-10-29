export interface Auth {
    readonly accessToken: string;
}

export interface Signup {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
}

export interface Login {
    readonly email: string;
    readonly password: string;
}
