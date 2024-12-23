import { Router } from "express";
import { getAllSongs, getSong, querySongs } from "../controllers/songsController.js";


const songsRouter = Router();

// test the /api/users route
songsRouter.get("/", (_req, res) => {
    res.send("You've found the songs!");
});

// get all songs
songsRouter.get("/all/get", getAllSongs);

// get a song by id
songsRouter.get("/:songId/get", getSong);

// query songs by title, album, genre, language, and artist
songsRouter.get("/query", querySongs);


export default songsRouter;
