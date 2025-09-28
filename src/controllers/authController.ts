import { pool } from "../db.js"
import type { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({"message": "All fields are required"});
    }
    const encryptedPWD = (await pool.query("SELECT password FROM users WHERE email = $1;", [email])).rows[0].password;
    if (encryptedPWD.length === 0) {
        return res.status(409).json({"message": "The user is not registered"});
    }

    const match = await bcrypt.compare(password, encryptedPWD);

    if (match) {
        const accessToken = jwt.sign(
            { "email": email },
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: '5m'}
        );
        const refreshToken = jwt.sign(
            { "email": email },
            process.env.REFRESH_TOKEN_SECRET!,
            {expiresIn: '1d'}
        );

        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const currentUser = (await client.query("SELECT user_id FROM users WHERE email = $1;", [email])).rows[0].user_id;
            await client.query("DELETE FROM refreshToken WHERE user_id = $1", [currentUser]);
            await client.query("INSERT INTO refreshToken (user_id, token) VALUES ($1, $2);", [currentUser, refreshToken]);
            await client.query("COMMIT")
        } catch (e: any) {
            await client.query("ROLLBACK");
            res.status(500).json({ "message": e.message });
        } finally {
            client.release();
        }
        
        res.cookie("jwt", refreshToken, {httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({accessToken});
    } else {
        return res.status(400).json({"message": "Invalid password"});
    }
}