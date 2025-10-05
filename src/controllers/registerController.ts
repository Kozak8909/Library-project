import bcrypt from "bcrypt";
import { pool } from "../db.js"
import type { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({"message": "All fields are required"});
    }
    const duplicate = (await pool.query("SELECT email FROM users WHERE email = $1;", [email])).rows[0];

    if (duplicate) return res.sendStatus(409);
    
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const encryptedPWD = await bcrypt.hash(password, 10);
        const id = (await client.query(`
            INSERT INTO users (
            first_name,
            last_name,
            email,
            password
            ) 
            VALUES ( $1, $2, $3, $4 ) RETURNING user_id;
        `, [firstName, lastName, email, encryptedPWD])).rows[0].user_id;
        await client.query("INSERT INTO userroles (user_id) VALUES($1);", [id]);    
        res.status(201).json({"success": "User created"});
        await client.query("COMMIT");
    } catch (e: any) {
        await client.query("ROLLBACK");
        res.status(500).json({"message": e.message});
    }
}