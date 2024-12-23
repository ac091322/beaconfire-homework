import db from "../config/connection.js";
import Follow from "../models/followModel.js";


(async () => {
    try {
        await Follow.deleteMany();
        console.log("All follows have been dropped");

    } catch (error) {
        console.error(`Drop error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to drop data, run in root folder: node ./seeders/dropFollows.js
