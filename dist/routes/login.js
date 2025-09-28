import { Router } from "express";
import { authUser } from "../controllers/authController.js";
const router = Router();
router.post("/", authUser);
export default router;
//# sourceMappingURL=login.js.map