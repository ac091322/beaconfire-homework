import app from "./app.js";
import db from "./config/connection.js";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 8000;

// list for the "open" event when the MongoDB connection is successfully established
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on http://localhost:${PORT}`);
    });
});
