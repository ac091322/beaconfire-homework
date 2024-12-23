import db from "../config/connection.js";
import Follow from "../models/followModel.js";
import User from "../models/userModel.js";
import Artist from "../models/artistModel.js";


(async () => {
    try {
        await Follow.deleteMany();
        console.log("Existing follows dropped");

        const alanchang = await User.findOne({ username: "alanchang" });
        const johndoe = await User.findOne({ username: "johndoe" });
        const janedoe = await User.findOne({ username: "janedoe" });

        const eagles = await Artist.findOne({ artist: "Eagles" });
        const theFugees = await Artist.findOne({ artist: "The Fugees" });
        const adele = await Artist.findOne({ artist: "Adele" });

        const follows = [
            {
                followerId: alanchang._id,
                followingId: eagles._id
            },
            {
                followerId: johndoe._id,
                followingId: theFugees._id
            },
            {
                followerId: janedoe._id,
                followingId: adele._id
            }
        ];

        const followInsert = await Follow.insertMany(follows);
        console.log(`${followInsert.length} follows inserted successfully`);

    } catch (error) {
        console.error(`Seed error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to seed data, run in root folder: node ./seeders/seedFollows.js
