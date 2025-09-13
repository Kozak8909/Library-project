import type { Request, Response } from "express";
import { pool } from "../db.js"
import {createDB} from "./dbController.js"

createDB(pool);

interface BookParameters {
    title: string,
    author: string
}

const getAllBooks = async (req: Request, res: Response) => {
    const result = await pool.query("SELECT * FROM books;");
    if (result.rows.length === 0) {
        return res.status(404).send("No data recorded yet");
    }
    res.json(result.rows);
}
const getBookByID = async (req: Request<{id: number}, {}, {}>, res: Response) => {
    const {id} = req.params;
    const result = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
    if (result.rows.length === 0) {
        return res.status(404).send(`No data at id ${id}`);
    }
    res.json(result.rows[0]);
}
const addBook = async (req: Request<{}, {}, BookParameters>, res: Response) => {
    const {title , author} = req.body;
    const result = await pool.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *;", [title, author]);
    res.json(result.rows[0]);
}
const updateBook = async (req: Request<{id: number}, {}, BookParameters>, res: Response) => {
    const {id} = req.params;
    const {title, author} = req.body;
    const result = await pool.query("UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *;", [title, author, id]);
    if (result.rows.length === 0) {
        return res.status(404).send(`No data at id ${id}`);
    }
    res.json(result.rows[0]);
}
const deleteBook = async (req: Request<{id: number}, {}, {}>, res: Response) => {
    const {id} = req.params;
    const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING*;", [id]);
    if (result.rows.length === 0) {
        return res.status(404).send(`No data at id ${id}`);
    }
    res.send("Book deleted");
}

export default {getAllBooks, getBookByID, addBook, updateBook, deleteBook};