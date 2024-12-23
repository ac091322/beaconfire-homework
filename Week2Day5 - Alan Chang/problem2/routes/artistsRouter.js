import { Router } from "express";
import { getAllArtists, getArtist, createArtist, deleteArtist } from "../controllers/artistsControllers.js";


const artistsRouter = Router();

// test the /api/users route
artistsRouter.get("/", (_req, res) => {
    res.send("You've found the artists!");
});

// get all users
artistsRouter.get("/all/get", getAllArtists);

// get an artist by id
artistsRouter.get("/:artistId/get", getArtist);

// create a new artist
artistsRouter.post("/post", createArtist);

// delete an artist by id
artistsRouter.delete("/:artistId/delete", deleteArtist);


export default artistsRouter;
