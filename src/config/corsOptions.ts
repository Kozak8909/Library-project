import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
    origin: (origin: any, callback: Function) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus: 200
}