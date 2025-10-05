import {Pool} from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bookDB",
    password: "12348765",
    port: 5432,
});