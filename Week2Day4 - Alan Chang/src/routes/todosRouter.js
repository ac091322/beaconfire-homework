import express from "express";
import { promises as fs } from 'fs';


const todoRouter = express.Router();

// Postman text collection exported and included in folder directory

// test the /api/todos route
todoRouter.get("/", (_req, res) => {
    res.send("You've found the todos!");
});

// get all todos
todoRouter.get("/all", async (_req, res) => {
    try {
        const data = await fs.readFile("todos-data.json", { encoding: "utf8" });
        return res.json(JSON.parse(data));
    } catch (error) {
        return res.status(500).send(`${error}`);
    }
});

// create a todo
todoRouter.post("/post", async (req, res) => {
    const { title, description } = req.body;
    const newTodo = {
        id: Date.now(),
        title,
        description,
        status: "NOT DONE",
        timestamp: new Date().toISOString()
    };

    try {
        // read the current data from the file, if the file doesn't exist, start with an empty string
        let todosData = await fs.readFile("todos-data.json", { encoding: "utf8" }).catch(() => "");

        let todosList = [];

        // if the file is empty, initialize it with an empty array
        if (todosData === "") {
            todosList = [];
        } else {
            todosList = JSON.parse(todosData);
        }

        // push new todo to the todo array
        todosList.push(newTodo);

        // write the updated array back to the file
        await fs.writeFile("todos-data.json", JSON.stringify(todosList, null, 2));
        console.log("🚀🚀🚀🚀🚀 Successfully added todo to todo list");
        return res.status(201).json(newTodo);

    } catch (error) {
        return res.status(500).send(`${error}`);
    }
});

// edit a todo by id
todoRouter.put("/:todoId/put", async (req, res) => {
    const { todoId } = req.params;
    const { title, description, status } = req.body;
    const todoToEdit = {
        title,
        description,
        status,
        timestamp: new Date().toISOString()
    }

    try {
        const data = await fs.readFile("todos-data.json", { encoding: "utf8" });
        const todos = JSON.parse(data);
        const todoToEditId = todos.findIndex(todo => todo.id === Number(todoId));

        if (todoToEditId === -1) return res.status(404).send(`Todo with ID ${todoId} not found`);

        // update the todo at the found index with the new data
        // copy todo at index todoToEditId, replace with new values coming from todoToEdit object
        todos[todoToEditId] = { ...todos[todoToEditId], ...todoToEdit };

        await fs.writeFile("todos-data.json", JSON.stringify(todos, null, 2));
        return res.status(200).send(`Todo with ID ${todoId} successfully edited in file`);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
});

// edit the status of a todo by id
todoRouter.patch("/:todoId/patch", async (req, res) => {
    const { todoId } = req.params;
    const { status } = req.body;
    const newStatus = { status };

    try {
        const data = await fs.readFile("todos-data.json", { encoding: "utf8" });
        const todos = JSON.parse(data);
        const todoToEditId = todos.findIndex(todo => todo.id === Number(todoId));

        if (todoToEditId === -1) return res.status(404).send(`Todo with with ID ${todoId} not found`);

        // update the status of the todo at the found index with the new status
        // copy todo at index todoToEditId, replace previous status with newStatus
        todos[todoToEditId] = { ...todos[todoToEditId], ...newStatus };

        await fs.writeFile("todos-data.json", JSON.stringify(todos, null, 2));
        return res.status(200).send(`Todo with ID ${todoId} edited in file`);

    } catch (error) {
        return res.status(500).send(`${error}`);
    }
});

// delete a todo by id
todoRouter.delete("/:todoId/delete", async (req, res) => {
    const { todoId } = req.params;

    try {
        const data = await fs.readFile("todos-data.json", { encoding: "utf8" });
        const todos = JSON.parse(data);
        const todoToDeleteId = todos.findIndex(todo => todo.id === Number(todoId));

        if (todoToDeleteId === -1) return res.status(404).send(`Todo of ID ${todoId} not found`);

        // remove the todo from the todo array by splicing at its index and removing 1 item
        todos.splice(todoToDeleteId, 1);

        await fs.writeFile("todos-data.json", JSON.stringify(todos, null, 2));
        return res.status(200).send(`Todo with ID ${todoId} deleted from file`);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }

});


export default todoRouter;
