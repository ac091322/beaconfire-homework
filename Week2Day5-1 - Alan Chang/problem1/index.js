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

// listener for the "error" event to handle MongoDB connection errors
db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
