import { Router } from "express";
import routeController from "../controllers/routeController.js"

const router = Router();

router.route("/")
    .get(routeController.getAllBooks)
    .post(routeController.addBook);
    
router.route("/:id")
    .get(routeController.getBookByID)
    .put(routeController.updateBook)
    .delete(routeController.deleteBook);

export default router;