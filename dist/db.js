import { Pool } from "pg";
export const pool = new Pool({
    user: "userName",
    host: "localhost",
    database: "dbName",
    password: "yourPassword",
    port: 5432,
});
//# sourceMappingURL=db.js.map