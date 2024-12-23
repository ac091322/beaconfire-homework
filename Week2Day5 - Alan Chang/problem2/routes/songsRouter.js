import { Router } from "express";
import { getAllSongs, getSong } from "../controllers/songsController.js";


const songsRouter = Router();

// test the /api/users route
songsRouter.get("/", (_req, res) => {
    res.send("You've found the songs!");
});

// get all songs
songsRouter.get("/all/get", getAllSongs);

// get a song by id
songsRouter.get("/:songId/get", getSong);


export default songsRouter;
