export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    email_verified: boolean;
    phone_verified: boolean;
    mfa_preference: "none" | "email" | "phone";
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
}

declare global {
    namespace Express {
        export interface Request {
            user: Payload;
        }
    }
}
