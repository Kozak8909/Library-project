import type { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "../config/allowedOrigins.js";

export const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (typeof(origin) === "string" && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
}