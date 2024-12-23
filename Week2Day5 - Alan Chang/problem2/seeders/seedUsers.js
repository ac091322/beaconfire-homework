import db from "../config/connection.js";
import User from "../models/userModel.js";


(async () => {
    try {
        await User.deleteMany();
        console.log("Existing users dropped");

        const users = [
            {
                username: "alanchang",
                email: "alan@beaconfire.com",
                password: "password",
                timeStamp: new Date().toISOString()
            },
            {
                username: "johndoe",
                email: "john@beaconfire.com",
                password: "password",
                timeStamp: new Date().toISOString()
            },
            {
                username: "janedoe",
                email: "jane@beaconfire.com",
                password: "password",
                timeStamp: new Date().toISOString()
            }
        ]

        const userInsert = await User.insertMany(users);
        console.log(`${userInsert.length} users inserted successfully`);

    } catch (error) {
        console.error(`Seed error: ${error}`);

    } finally {
        await db.close();
        console.log("Database connection closed");
    }
})();


// to seed data, run in root folder: node ./seeders/seedUsers.js
