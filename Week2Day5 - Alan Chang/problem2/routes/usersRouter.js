import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser, getLikes, likeSong, unlikeSong, getFollowings, followArtist, unfollowArtist } from "../controllers/usersController.js";


const usersRouter = Router();

// test the /api/users route
usersRouter.get("/", (_req, res) => {
    res.send("You've found the users!");
});

// get all users
usersRouter.get("/all/get", getAllUsers);

// get a user by id
usersRouter.get("/:userId/get", getUser);

// create a user
usersRouter.post("/post", createUser);

// update a user by id
usersRouter.put("/:userId/put", updateUser);

// delete a user by id
usersRouter.delete("/:userId/delete", deleteUser);

// get likes by user id
usersRouter.get("/:userId/likes", getLikes);

// add song to likes by user id and song id
usersRouter.post("/:userId/like/:songId", likeSong);

// remove song from likes by user id and song id
usersRouter.delete("/:userId/unlike/:songId", unlikeSong);

// get followings by user id
usersRouter.get("/:userId/followings", getFollowings);

// follow artist by user id and artist id
usersRouter.post("/:userId/follow/:artistId", followArtist);

// unfollow artist by user id and artist id
usersRouter.delete("/:userId/unfollow/:artistId", unfollowArtist);


export default usersRouter;
