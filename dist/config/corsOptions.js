import { allowedOrigins } from "./allowedOrigins.js";
export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus: 200
};
//# sourceMappingURL=corsOptions.js.map