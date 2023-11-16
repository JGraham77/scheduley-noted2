import { Query } from "../connection";
import type { BaseUser, User } from "../../types";

type Columns = "id" | "email" | "username";

const find_by = (column: Columns, value: string | number) =>
    Query<User[]>(`SELECT * FROM users WHERE ${column}=$1`, [value]);

const create = ({ name, email, username, password, phone }: BaseUser) =>
    Query("INSERT INTO Users (name, email, username, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id", [
        name,
        email,
        username,
        password,
        phone,
    ]);

const update_mfa = (preference: User["mfa_preference"], id: User["id"]) =>
    Query("UPDATE users SET mfa_preference=$1 WHERE id=$2", [preference, id]);

const verify = (email: string) => Query("UPDATE users SET email_verified=true WHERE email=$1", [email]);

const verifyPhone = (id: number) => Query("UPDATE users SET phone_verified=true WHERE email=$1", [id]);

export default {
    find_by,
    create,
    update_mfa,
    verify,
    verifyPhone,
};
