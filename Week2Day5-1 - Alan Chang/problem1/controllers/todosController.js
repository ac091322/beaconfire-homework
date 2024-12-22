import Todo from "../models/todoModel.js";

// get all todos
const getAllTodos = async (_req, res) => {
    try {
        const allTodos = await Todo.find();
        return res.status(200).json(allTodos);

    } catch (error) {
        return res.status(500).send(`${error}`);
    }
}

// get a todo by id
const getTodo = async (req, res) => {
    const { todoId } = req.params;
    if (todoId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const getTodo = await Todo.findById(todoId);
        if (!getTodo) return res.status(404).json({ error: "Todo not found" });

        return res.status(200).json(getTodo);

    } catch (error) {
        return res.status(500).json(error);
    }
}

// create a todo
const createTodo = async (req, res) => {
    try {
        const createTodo = await Todo.create(req.body);
        return res.status(201).json(createTodo);

    } catch (error) {
        return res.status(500).send(`${error}`);
    }
}

// edit a todo by id
const editTodo = async (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ Error: "Title, description, and status are required" });
    }

    const { todoId } = req.params;
    if (todoId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const todoToUpdate = await Todo.findByIdAndUpdate(
            todoId,
            req.body,
            { new: true } // option to return the updated document
        );
        if (!todoToUpdate) return res.status(404).json({ Error: "ID not found" })

        return res.status(200).send(`Todo with ID ${todoId} successfully edited in database`);

    } catch (error) {
        return res.status(500).send(error);
    }
}

// // edit the status of a todo by id
const editTodoStatus = async (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ Error: "Status is required" });

    const { todoId } = req.params;
    if (todoId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const statusToUpdate = await Todo.findOneAndUpdate(
            { _id: todoId },  // edit document by id
            { $set: { status } },  // update only the status field
            { new: true }  // option to return the updated document
        );
        if (!statusToUpdate) return res.status(404).json({ Error: "ID not found" });

        return res.status(200).send(`Todo with ID ${todoId} updated in database`);

    } catch (error) {
        return res.status(500).send(`${error}`);
    }
}

// delete a todo by id
const deleteTodo = async (req, res) => {
    const { todoId } = req.params;
    if (todoId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const todoToDelete = await Todo.findByIdAndDelete(todoId);
        if (!todoToDelete) return res.status(404).json({ Error: "ID not found" });

        return res.status(200).send(`Todo with ID ${todoId} deleted from database`);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}


export { getAllTodos, getTodo, createTodo, editTodo, editTodoStatus, deleteTodo };
