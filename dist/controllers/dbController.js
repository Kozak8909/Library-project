export const createDB = async (pool) => {
    const client = await pool.connect();
    try {
        client.query("BEGIN");
        await client.query("CREATE TABLE IF NOT EXISTS books(id SERIAL PRIMARY KEY, title VARCHAR(255));");
        await client.query("CREATE TABLE IF NOT EXISTS authors(author_id SERIAL PRIMARY KEY, author_name VARCHAR(255));");
        await client.query("CREATE TABLE IF NOT EXISTS bookauthors(book_id INTEGER REFERENCES books(id), author_id INTEGER REFERENCES authors(author_id));");
        client.query("COMMIT");
    }
    catch (e) {
        client.query("ROLLBACK");
        throw (e);
    }
    finally {
        client.release();
    }
};
//# sourceMappingURL=dbController.js.map