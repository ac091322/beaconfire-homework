import db from "../config/connection.js";
import Artist from "../models/artistModel.js";


(async () => {
    try {
        await Artist.deleteMany();
        console.log("Existing artists dropped");

        const artists = [
            {
                artist: "Eagles"
            },
            {
                artist: "Michael Jackson"
            },
            {
                artist: "John Lenon"
            },
            {
                artist: "The Fugees"
            },
            {
                artist: "Nirvana"
            },
            {
                artist: "Radiohead"
            },
            {
                artist: "Adele"
            },
            {
                artist: "TLC"
            },
            {
                artist: "Celine Dion"
            }
        ];

        const artistInsert = await Artist.insertMany(artists);
        console.log(`${artistInsert.length} artists inserted successfully`);

    } catch (error) {
        console.error(`Seed error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();
