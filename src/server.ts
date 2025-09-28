import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js"
import { credentials } from "./middleware/credentials.js";
import books from "./routes/books.js";
import register from "./routes/register.js";
import auth from "./routes/login.js";
import logout from "./routes/logout.js"
import refresh from "./routes/refresh.js"
import { verifyAccessToken } from "./middleware/verifyToken.js"
import { logError } from "./middleware/logErrors.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(credentials)
app.use(cors(corsOptions));

app.use("/register", register);
app.use("/login", auth);
app.use("/logout", logout);
app.use("/refresh", refresh);

app.use(verifyAccessToken);
app.use("/books", books);

app.use(logError);

app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)});