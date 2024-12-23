import db from "../config/connection.js";
import Like from "../models/likeModel.js";


(async () => {
    try {
        await Like.deleteMany();
        console.log("All likes have been dropped");

    } catch (error) {
        console.error(`Drop error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to drop data, run in root folder: node ./seeders/dropLikes.js
