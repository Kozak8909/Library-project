import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";
const router = Router();
router.post("/", handleRefreshToken);
export default router;
//# sourceMappingURL=refresh.js.map