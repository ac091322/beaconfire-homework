import User from "../models/userModel.js";
import Like from "../models/likeModel.js";
import Song from "../models/songModel.js";
import Follow from "../models/followModel.js";
import Artist from "../models/artistModel.js";


// get all users
const getAllUsers = async (_req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// get a user by id
const getUser = async (req, res) => {
    const { userId } = req.params;
    if (userId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// create a user
const createUser = async (req, res) => {
    try {
        const createUser = await User.create(req.body);
        return res.status(201).json(createUser);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// update username and password by id
const updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ Error: "Username, email, and password are required" });
    }

    const { userId } = req.params;
    if (userId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        // uses any query to find a document and replaces the entire document with the provided data
        // can also use findByIdAndReplace to find by _id and replace entire document
        const userToUpdate = await User.findOneAndReplace(
            { _id: userId },
            req.body,
            { new: true, returnDocument: "after" } // option to return the updated document
        );
        if (!userToUpdate) return res.status(404).json({ Error: "User not found" })

        return res.status(200).send(`User with ID ${userId} successfully edited in database`);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// delete a user by id
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (userId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const userToDelete = await User.findByIdAndDelete(userId);
        if (!userToDelete) return res.status(404).json({ Error: "User not found" });

        return res.status(200).send(`User with ID ${userId} deleted from database`);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// get likes by user id
const getLikes = async (req, res) => {
    const { userId } = req.params;
    if (userId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const likes = await Like.find({ user: userId })
            .populate("song")
            .exec();

        if (likes.length === 0) return res.status(404).json({ message: "No likes found for this user" });

        return res.status(200).json(likes);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// add song to likes by user id and song id
const likeSong = async (req, res) => {
    const { userId, songId } = req.params;
    if (userId.length !== 24 || songId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const song = await Song.findById(songId);
        if (!song) return res.status(404).json({ message: "Song not found" });

        const existingLike = await Like.findOne({ user: userId, song: songId });

        if (existingLike) return res.status(409).json({ message: "You have already liked this song" });

        const newLike = new Like({
            user: userId,
            song: songId
        });

        await newLike.save();
        return res.status(201).json({ message: `${song.title} added to your likes`, like: newLike });

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// remove song from likes by user id and song id
const unlikeSong = async (req, res) => {
    const { userId, songId } = req.params;
    if (userId.length !== 24 || songId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const song = await Song.findById(songId);
        if (!song) return res.status(404).json({ message: "Song not found" });

        const existingLike = await Like.findOne({ user: userId, song: songId });

        if (!existingLike) return res.status(404).json({ message: `${song.title} is not in your likes` });

        await Like.deleteOne({ user: userId, song: songId });
        return res.status(200).json({ message: `${song.title} removed from your likes` });

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// get followings by user id
const getFollowings = async (req, res) => {
    const { userId } = req.params;
    if (userId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const followings = await Follow.find({ followerId: userId })
            .populate("followingId")
            .exec();

        if (followings.length === 0) return res.status(404).json({ message: "No followings found for this user" });

        return res.status(200).json(followings);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
};

// follow artist by user id and artist id
const followArtist = async (req, res) => {
    const { userId, artistId } = req.params;
    if (userId.length !== 24 || artistId.length !== 24) {
        return res.status(409).json({ Error: "ID not proper format" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const artist = await Artist.findById(artistId);
        if (!artist) return res.status(404).json({ message: "Artist not found" });

        const existingFollowing = await Follow.findOne({ followerId: userId, followingId: artistId });

        if (existingFollowing) return res.status(409).json({ message: `You are already following ${artist.artist}` });

        const newFollowing = new Follow({
            followerId: userId,
            followingId: artistId
        });

        await newFollowing.save();
        return res.status(201).json({
            message: `You are now following ${artist.artist}`,
            following: newFollowing
        });

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
};

// unfollow artist by user id and artist id
const unfollowArtist = async (req, res) => {
    const { userId, artistId } = req.params;
    if (userId.length !== 24 || artistId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const artist = await Artist.findById(artistId);
        if (!artist) return res.status(404).json({ message: "Artist not found" });

        const existingFollowing = await Follow.findOne({ followerId: userId, followingId: artistId });

        if (!existingFollowing) return res.status(404).json({ message: `You are not following ${artist.artist}` });

        await Follow.deleteOne({ followerId: userId, followingId: artistId });
        return res.status(200).json({ message: `You are no longer following ${artist.artist}` });

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}


export { getAllUsers, getUser, createUser, updateUser, deleteUser, getLikes, likeSong, unlikeSong, getFollowings, followArtist, unfollowArtist };
