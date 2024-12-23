import db from "../config/connection.js";
import Song from "../models/songModel.js";
import Artist from "../models/artistModel.js";

(async () => {
    try {
        await Song.deleteMany();
        console.log("Existing songs dropped");

        const eagles = await Artist.findOne({ artist: "Eagles" });
        const michaelJackson = await Artist.findOne({ artist: "Michael Jackson" });
        const johnLenon = await Artist.findOne({ artist: "John Lenon" });
        const theFugees = await Artist.findOne({ artist: "The Fugees" });
        const nirvana = await Artist.findOne({ artist: "Nirvana" });
        const radiohead = await Artist.findOne({ artist: "Radiohead" });
        const adele = await Artist.findOne({ artist: "Adele" });
        const tlc = await Artist.findOne({ artist: "TLC" });
        const celineDion = await Artist.findOne({ artist: "Celine Dion" });

        const songs = [
            {
                title: "Hotel California",
                album: "Hotel California",
                genre: "Rock",
                language: "English",
                artistId: eagles._id
            },
            {
                title: "Billie Jean",
                album: "Thriller",
                genre: "Pop",
                language: "English",
                artistId: michaelJackson._id
            },
            {
                title: "Imagine",
                album: "Imagine",
                genre: "Pop",
                language: "English",
                artistId: johnLenon._id
            },
            {
                title: "Killing Me Softly with His Song",
                album: "The Fugees",
                genre: "R&B",
                language: "English",
                artistId: theFugees._id
            },
            {
                title: "Smells Like Teen Spirit",
                album: "Nevermind",
                genre: "Rock",
                language: "English",
                artistId: nirvana._id
            },
            {
                title: "Creep",
                album: "Pablo Honey",
                genre: "Alternative",
                language: "English",
                artistId: radiohead._id
            },
            {
                title: "Rolling in the Deep",
                album: "21",
                genre: "Pop",
                language: "English",
                artistId: adele._id
            },
            {
                title: "Waterfalls",
                album: "CrazySexyCool",
                genre: "Hip Hop",
                language: "English",
                artistId: tlc._id
            },
            {
                title: "My Heart Will Go On",
                album: "Let's Talk About Love",
                genre: "Pop",
                language: "English",
                artistId: celineDion._id
            }
        ];

        const songInsert = await Song.insertMany(songs);
        console.log(`${songInsert.length} songs inserted successfully`);

    } catch (error) {
        console.error(`Seed error: ${error.message}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to seed data, run in root folder: node ./seeders/seedSongs.js
