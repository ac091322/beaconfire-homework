import express from "express";
import morgan from "morgan";
import usersRouter from "./routes/usersRouter.js";
import songsRouter from "./routes/songsRouter.js";
import artistsRouter from "./routes/artistsRouter.js";


const app = express();

app.use(express.json());
app.use(morgan("dev"));

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
