import express from "express";
import morgan from "morgan";
import path from 'path';
import cors from 'cors';
import usersRouter from "./routes/usersRouter.js";
import songsRouter from "./routes/songsRouter.js";
import artistsRouter from "./routes/artistsRouter.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/songs", songsRouter);
app.use("/api/artists", artistsRouter);

app.get("/", (_req, res) => {
    res.send("Hello, world");
});

app.get("/api", (_req, res) => {
    res.send("Hello, API!");
});

app.get("*", (_req, res) => {
    res.status(404).send("404 page not found, try a different URL!");
});


export default app;
