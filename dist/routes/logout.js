import { Router } from "express";
import { logoutUser } from "../controllers/logoutController.js";
const router = Router();
router.post("/", logoutUser);
export default router;
//# sourceMappingURL=logout.js.map