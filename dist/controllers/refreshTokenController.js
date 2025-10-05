import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../db.js";
dotenv.config();
export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = (await pool.query(`
        SELECT u.email, u.user_id FROM users u 
        INNER JOIN refreshToken rt 
        ON u.user_id = rt.user_id 
        WHERE token = $1;
    `, [refreshToken])).rows[0];
    const email = user.email;
    const id = user.user_id;
    if (!email)
        return res.sendStatus(403);
    const roles = (await pool.query(`
            SELECT ARRAY_AGG(role_id) AS roles 
            FROM userroles 
            GROUP BY user_id 
            HAVING user_id = $1;
        `, [id])).rows[0].roles;
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (email !== decoded.email)
            res.sendStatus(403);
        const accessToken = jwt.sign({
            "User": {
                "email": email,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        res.json({ accessToken });
    }
    catch (err) {
        res.sendStatus(403);
    }
};
//# sourceMappingURL=refreshTokenController.js.map