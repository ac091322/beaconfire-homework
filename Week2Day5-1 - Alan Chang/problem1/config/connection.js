import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

// const mongoUrl = process.env.ENV === "development"
//     ? process.env.MONGO_URL_LOCAL
//     : process.env.MONGO_URL_ATLAS;

const mongoUrl = process.env.MONGO_URL_ATLAS;

if (!mongoUrl) throw new Error("mongoDB URI is not defined");

mongoose.connect(mongoUrl, {
})
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const db = mongoose.connection;

// listen for the "error" event on the mongoose conection object (db)
db.on("error", console.error.bind(console, "connection error:"));

// listen for the "open" event on the mongoose connection object (db)
db.once("open", () => { console.log("Connected to the database"); });


export default db;
