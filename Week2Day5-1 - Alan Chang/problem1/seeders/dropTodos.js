import db from "../config/connection.js";
import Todo from "../models/todoModel.js";


(async () => {
    try {
        await Todo.deleteMany();
        console.log("All todos have been dropped");

    } catch (error) {
        console.error(`Drop error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to drop data, run in root folder: node ./seeders/dropTodos.js
