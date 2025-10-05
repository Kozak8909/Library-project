import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer "))
        return res.sendStatus(401);
    const accessToken = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.User.email;
        req.roles = decoded.User.roles;
    }
    catch (err) {
        return res.sendStatus(403);
    }
    next();
};
//# sourceMappingURL=verifyToken.js.map