import fs from "fs";
import fsPromises from "fs/promises";
export const logError = async (err, req, res, next) => {
    const date = new Date();
    if (!fs.existsSync(new URL("../files", import.meta.url))) {
        await fsPromises.mkdir(new URL("../files", import.meta.url));
    }
    await fsPromises.appendFile(new URL("../files/errLog.txt", import.meta.url), `${date} ${err.name}: ${err.message} ${req.method} ${req.headers.origin} ${req.url}\n`);
    res.sendStatus(500);
    next();
};
//# sourceMappingURL=logErrors.js.map