import db from "../config/connection.js";
import Song from "../models/songModel.js";


(async () => {
    try {
        await Song.deleteMany();
        console.log("All songs have been dropped");

    } catch (error) {
        console.error(`Drop error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to drop data, run in root folder: node ./seeders/dropSongs.js
