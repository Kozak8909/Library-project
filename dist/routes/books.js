import { Router } from "express";
import routeController from "../controllers/routeController.js";
import { ROLES_LIST } from "../config/rolesList.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
const router = Router();
router.get("/find/:id", routeController.getBookByID);
router.get("/find", routeController.getBooks);
router.post("/add", verifyRoles(ROLES_LIST.Admin), routeController.addBook);
router.put("/update/:id", verifyRoles(ROLES_LIST.Admin), routeController.updateBook);
router.delete("/delete/:id", verifyRoles(ROLES_LIST.Admin), routeController.deleteBook);
export default router;
//# sourceMappingURL=books.js.map