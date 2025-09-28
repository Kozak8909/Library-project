import {Pool} from "pg";

export const pool = new Pool({
    user: "username",
    host: "yourhost",
    database: "yourDB",
    password: "yourpassword",
    port: 5432,
});