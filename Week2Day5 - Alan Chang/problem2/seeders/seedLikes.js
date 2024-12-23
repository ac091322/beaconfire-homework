import db from "../config/connection.js";
import Like from "../models/likeModel.js";
import User from "../models/userModel.js";
import Song from "../models/songModel.js";


(async () => {
    try {
        await Like.deleteMany();
        console.log("Existing likes dropped");

        const alanchang = await User.findOne({ username: "alanchang" });
        const johndoe = await User.findOne({ username: "johndoe" });
        const janedoe = await User.findOne({ username: "janedoe" });

        const hotelCalifornia = await Song.findOne({ title: "Hotel California" });
        const killingMeSoftly = await Song.findOne({ title: "Killing Me Softly with His Song" });
        const rollingInTheDeep = await Song.findOne({ title: "Rolling in the Deep" });

        const likes = [
            {
                user: alanchang._id,
                song: hotelCalifornia._id
            },
            {
                user: johndoe._id,
                song: killingMeSoftly._id
            },
            {
                user: janedoe._id,
                song: rollingInTheDeep._id
            }
        ];

        const likeInsert = await Like.insertMany(likes);
        console.log(`${likeInsert.length} likes inserted successfully`);

    } catch (error) {
        console.error(`Seed error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to seed data, run in root folder: node ./seeders/seedLikes.js
