import db from "../config/connection.js";
import User from "../models/userModel.js";


(async () => {
    try {
        await User.deleteMany();
        console.log("All users have been dropped");

    } catch (error) {
        console.error(`Drop error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to drop data, run in root folder: node ./seeders/dropUsers.js
