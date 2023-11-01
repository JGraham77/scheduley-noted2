export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    email_verified: boolean;
    phone_verified: boolean;
}

export interface Event {
    id: number;
    user_id: User["id"];
    name: string;
    location?: string;
    description?: string;
    date_time: string;
}
