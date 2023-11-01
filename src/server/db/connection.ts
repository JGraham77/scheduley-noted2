import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.pg);

export const Query = <T = pg.QueryResult>(sql: string, values: unknown[] = []) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.command === "SELECT") {
                    resolve(results.rows as T);
                } else {
                    resolve(results as T);
                }
            }
        });
    });
};
