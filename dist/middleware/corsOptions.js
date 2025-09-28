const whiteList = ["https://www.yourdomain.com"];
export const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    operationSuccessStatus: 200
};
//# sourceMappingURL=corsOptions.js.map