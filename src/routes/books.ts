import { Router } from "express";
import routeController from "../controllers/routeController.js"

const router = Router();

router.get("/find/:id", routeController.getBookByID);
router.get("/find", routeController.getBooks);

router.post("/add", routeController.addBook);
    
router.put("/update/:id", routeController.updateBook)
router.delete("/delete/:id", routeController.deleteBook);

export default router;