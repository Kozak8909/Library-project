import type { Request, Response } from "express";
import { pool } from "../db.js";

const getBooks = async (req: Request, res: Response) => {
    const { title, author } = req.query;
    const queryParams = [];
    const condition = [];
    let sqlQuery = `
        SELECT books.id, books.title, ARRAY_AGG(authors.author_name) 
        AS authors
        FROM books
        INNER JOIN bookauthors ba
        ON books.id = ba.book_id 
        INNER JOIN authors 
        ON ba.author_id = authors.author_id
        GROUP BY books.id, books.title
    `;
    if (title) {
        queryParams.push(title);
        condition.push("books.title = $1");
    }
    if (author) {
        queryParams.push(author);
        condition.push(`bool_or(authors.author_name = $${queryParams.length})`);
    }
    if (queryParams.length > 0) {
        sqlQuery += " HAVING " + condition.join(" AND ");
    }
    const result = await pool.query(sqlQuery, queryParams);
    if (result.rows.length === 0) {
        return res.status(404).send("No data recorded yet");
    }
    res.json(result.rows);
}
const getBookByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await pool.query(`
        SELECT books.id, books.title, ARRAY_AGG(authors.author_name) 
        AS authors
        FROM books
        INNER JOIN bookauthors ba
        ON books.id = ba.book_id 
        INNER JOIN authors 
        ON ba.author_id = authors.author_id
        GROUP BY books.id, books.title
        HAVING books.id = $1;
    `, [id]);
    if (result.rows.length === 0) {
        return res.status(404).send(`No data at id ${id}`);
    }
    res.json(result.rows[0]);
}

const addBook = async (req: Request, res: Response) => {
    const {title , authors} = req.body;
    if (!title || !authors) {
        return res.status(400).json({"Invalid input":  "Title and author cannot be empty"});
    }
    const client = await pool.connect(); 
    try {
        await client.query("BEGIN");
        const booksID = (await client.query("INSERT INTO books (title) VALUES($1) RETURNING id", [title])).rows[0].id;
        const authorsID = (await client.query(`
            WITH authors_id AS (
            INSERT INTO authors (author_name) 
            SELECT unnest($1::varchar(255)[])
            RETURNING author_id
            )
            SELECT ARRAY_AGG(author_id) AS authors FROM authors_id;
        `, [authors])).rows[0].authors;
        await client.query("INSERT INTO bookauthors (book_id, author_id) SELECT $1, unnest($2::integer[])", [booksID, authorsID]);
        await client.query("COMMIT");   
    } catch (e: any) {
        await client.query("ROLLBACK");
        res.json({"message": e.message})
    } finally {
        client.release();
    }
    res.status(201).send("Book added");
}
const updateBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {title, authors} = req.body;
    if (!title || !authors) {
        return res.status(400).send("Invalid input: title and author cannot be empty");
    }
    const client = await pool.connect(); 
    try {
        await client.query("BEGIN");
        await client.query("UPDATE books SET title = $1 WHERE id = $2", [title, id])
        const authorsID = (await client.query(`
            SELECT ARRAY_AGG(authors.author_id) AS authorsID
            FROM authors
            INNER JOIN bookauthors ba
            ON authors.author_id = ba.author_id
            INNER JOIN books b
            ON ba.book_id = b.id 
            WHERE b.id = $1;
        `, [id])).rows[0].authorsid;
        if (authorsID.length !== authors.length) {
            await client.query("ROLLBACK");
            return res.status(400).send("Missing authors, please provide full list of the authors");
        }   
        await client.query(`
            UPDATE authors a 
            SET author_name = new.upd_name
            FROM unnest($1::integer[], $2::varchar(255)[]) 
            AS new(author_id, upd_name)
            WHERE a.author_id = new.author_id;
        `, [authorsID, authors]);
        const result = await client.query(`
            SELECT books.id, books.title, ARRAY_AGG(authors.author_name) 
            AS authors
            FROM books
            INNER JOIN bookauthors ba
            ON books.id = ba.book_id 
            INNER JOIN authors 
            ON ba.author_id = authors.author_id
            GROUP BY books.id, books.title
            HAVING books.id = $1;
        `, [id]);
        if (result.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).send(`No data at id ${id}`);
        }
        res.json(result.rows[0]);
        await client.query("COMMIT");
    } catch (e: any) {
        await client.query("ROLLBACK");
        res.json({"message": e.message})
    } finally {
        client.release();
    }
}
const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const desiredBook = await pool.query("SELECT id FROM books WHERE id = $1;", [id]);
    if (desiredBook.rows.length === 0) {
        return res.status(404).send(`No data at id ${id}`);
    }
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await client.query("DELETE FROM bookauthors WHERE book_id = $1;", [id]);
        await client.query("DELETE FROM books WHERE id NOT IN (SELECT book_id FROM bookauthors);");
        await client.query("DELETE FROM authors WHERE author_id NOT IN (SELECT author_id FROM bookauthors);");
        res.status(200).send("Book deleted");
        await client.query("COMMIT");
    } catch (e: any) {
        await client.query("ROLLBACK");
        res.json({"message": e.message})
    } finally {
        client.release();
    }   
}

export default {getBooks, getBookByID, addBook, updateBook, deleteBook};