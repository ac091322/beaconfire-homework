import db from "../config/connection.js";
import Artist from "../models/artistModel.js";


(async () => {
    try {
        await Artist.deleteMany();
        console.log("All artists have been dropped");

    } catch (error) {
        console.error(`Drop error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to drop data, run in root folder: node ./seeders/dropArtists.js
