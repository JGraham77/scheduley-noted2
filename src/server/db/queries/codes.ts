import { Code } from "../../types";
import { Query } from "../connection";

const deleteForUser = (user_id: Code["user_id"]) => Query("DELETE FROM Codes WHERE user_id=$1", [user_id]);

const getForUser = (user_id: Code["user_id"], code: Code["code"]) =>
    Query<Code[]>("SELECT * FROM Codes WHERE user_id=$1 AND code=$2", [user_id, code]);

const create = ({ user_id, code, issued, expiration }: Code) =>
    Query("INSERT INTO Codes (user_id, code, issued, expiration) VALUES ($1, $2, $3, $4))", [
        user_id,
        code,
        issued,
        expiration,
    ]);

export default {
    deleteForUser,
    getForUser,
    create,
};
