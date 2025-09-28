import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JWTPayload {
    email: string,
    iat?: number,
    exp?: number
}

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const accessToken = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(
            accessToken!,
            process.env.ACCESS_TOKEN_SECRET!
        ) as JWTPayload;
        req.user = decoded.email;
    } catch (err) {
        return res.sendStatus(403);
    }
    next()
}