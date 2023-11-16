export interface BaseUser {
    name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
}

export interface User extends BaseUser {
    id: number;
    email_verified: boolean;
    phone_verified: boolean;
    mfa_preference: "none" | "email" | "phone";
}

export interface Code {
    code: number;
    user_id: User["id"];
    issued: number;
    expiration: number;
}

export interface Event {
    id: number;
    user_id: User["id"];
    name: string;
    location?: string;
    description?: string;
    date_time: string;
}

export interface Payload {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    username: User["username"];
    email_verified: boolean;
    phone_verified: boolean;
}

declare global {
    namespace Express {
        export interface Request {
            user: Payload;
        }
    }
}
