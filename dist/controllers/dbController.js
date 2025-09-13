export const createDB = async (pool) => {
    try {
        await pool.query("CREATE TABLE IF NOT EXISTS Books(id SERIAL PRIMARY KEY, title VARCHAR(255), author VARCHAR(255));");
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=dbController.js.map