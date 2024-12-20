import express from "express";
import morgan from "morgan";
import todosRouter from "./src/routes/todosRouter.js";


const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/todos", todosRouter);

app.get("/", (_req, res) => {
    res.send("Hello, world!");
});

app.get("/api", (_req, res) => {
    res.send("Hello, API!");
});

app.get("*", (_req, res) => {
    res.send("404 Page not found, try a different URL!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
