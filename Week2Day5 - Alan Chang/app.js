import express from "express";
import morgan from "morgan";
import todosRouter from "./routers/todosRouter.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/todos", todosRouter);

app.get("/", (_req, res) => {
    res.send("Hello, world!");
})

app.get("/api", (_req, res) => {
    res.send("Hello, API!");
});

app.get("*", (_req, res) => {
    res.status(404).send("404 Page not found, try a different URL!");
});


export default app;
