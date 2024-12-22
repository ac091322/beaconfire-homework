import db from "../config/connection.js";
import Todo from "../models/todoModel.js";


(async () => {
    try {
        await Todo.deleteMany();
        console.log("Existing todos dropped");

        const todos = [
            {
                title: "Learn Mongoose",
                description: "Understand how to work with Mongoose and MongoDB",
                status: "IN PROGRESS",
                timestamp: new Date().toISOString()
            },
            {
                title: "Finish Seed Data",
                description: "Create seed data for the application",
                status: "NOT DONE",
                timestamp: new Date().toISOString()
            },
            {
                title: "Deploy to Atlas Cluster",
                description: "Refactor code to improve readability and maintainability",
                status: "DONE",
                timestamp: new Date().toISOString()
            }
        ];

        const todosInsert = await Todo.insertMany(todos);
        console.log(`${todosInsert.length} todos inserted successfully.`);

    } catch (error) {
        console.error(`Seed error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to seed data, run in root folder: node ./seeders/seedTodos.js
