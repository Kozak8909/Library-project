import bcrypt from "bcrypt";
import { pool } from "../db.js"
import type { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({"message": "All fields are required"});
    }
    const duplicate = (await pool.query("SELECT email FROM users WHERE email = $1;", [email])).rows[0].email;

    if (duplicate) return res.sendStatus(409);
    
    try {
        const encryptedPWD = await bcrypt.hash(password, 10);
        await pool.query(`
            INSERT INTO users (
            first_name,
            last_name,
            email,
            password
            ) 
            VALUES ( $1, $2, $3, $4 );
            `, [firstName, lastName, email, encryptedPWD]);
            res.status(201).json({"success": "User created"});
    } catch (e: any) {
        res.status(500).json({"message": e.message});
    }
}