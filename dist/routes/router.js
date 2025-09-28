import { Router } from "express";
import routeController from "../controllers/routeController.js";
const router = Router();
router.route("/find")
    .get(routeController.getAllBooks)
    .get(routeController.getBookByID)
    .get(routeController.getBookByTitle)
    .get(routeController.getBookByAuthor);
router.post("/add", routeController.addBook);
router.put("/update", routeController.updateBook);
router.delete("/delete", routeController.deleteBook);
export default router;
//# sourceMappingURL=router.js.map