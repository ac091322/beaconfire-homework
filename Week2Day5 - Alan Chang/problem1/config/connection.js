import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

// const mongoUrl = process.env.ENV === "development"
//     ? process.env.MONGO_URL_LOCAL
//     : process.env.MONGO_URL_ATLAS;

const mongoUri = process.env.MONGO_URL_ATLAS;

if (!mongoUri) throw new Error("MongoDB URI is not defined");

mongoose.connect(mongoUri)
    .then(() => { console.log("Connected to MongoDB!") })
    .catch((error) => { console.error("MongoDB connection error:", error) });

const db = mongoose.connection;

// listen for the "error" event on the mongoose conection object (db) after initial connection establshed
db.on("error", (error) => {
    console.error("MongoDB runtime connection error:", error);
});

// listen for the "disconnected" event indicating that the connection to MongoDB has been lost
db.on("disconnected", () => {
    console.warn("MongoDB connection lost, attempting to reconnect...");
});

// listen for the "reconnected" event indicating that Mongoose has reconnected to MongoDB
db.on("reconnected", () => {
    console.log("MongoDB has reconnected");
});

// Listen for the "close" event indicatING that the connection to MongoDB has been closed
db.on("close", () => {
    console.log("MongoDB connection closed.");
});


export default db;
