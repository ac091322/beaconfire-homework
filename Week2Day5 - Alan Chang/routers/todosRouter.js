import { Router } from "express";
import { getAllTodos, getTodo, createTodo, editTodo, editTodoStatus, deleteTodo } from "../controllers/todosController.js";


const todosRouter = Router();

// test the /api/todos route
todosRouter.get("/", (_req, res) => {
    res.send("You've found the todos!");
});

// get all todos
todosRouter.get("/all/get", getAllTodos);

// get a tody by id
todosRouter.get("/:todoId/get", getTodo);

// create a todo
todosRouter.post("/post", createTodo);

// edit a todo by id
todosRouter.put("/:todoId/put", editTodo);

// edit the status of a todo by id
todosRouter.patch("/:todoId/patch", editTodoStatus);

// delete a todo by id
todosRouter.delete("/:todoId/delete", deleteTodo);


export default todosRouter;
