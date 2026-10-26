import { Router } from "express";
import { getBooks, getBook, addBook, updateBook, deleteBook } from "../controllers/bookController.js";

const router = Router();

router.get("/", getBooks);
router.get("/:bookId", getBook);
router.post("/", addBook);
router.patch("/:bookId", updateBook)
router.delete("/:bookId", deleteBook);
export default router;