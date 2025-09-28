import type { Request, Response } from "express";
import { pool } from "../db.js";

export const logoutUser = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const user = (await client.query("SELECT user_id FROM refreshToken WHERE token = $1;", [refreshToken])).rows[0].user_id;
        if (!user) {
            await client.query("COMIT");
            res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true});
            return res.sendStatus(204);
        }
        await client.query("DELETE FROM refreshToken WHERE user_id = $1;", [user]);
        await client.query("COMMIT");
    } catch (err: any) {
        await client.query("ROLLBACK");
    } finally {
        client.release();
    }
    res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true});
    res.sendStatus(204);
}