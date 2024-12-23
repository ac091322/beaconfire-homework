import Song from "../models/songModel.js";
import Artist from "../models/artistModel.js";


// get all songs
const getAllSongs = async (_req, res) => {
    try {
        const allSongs = await Song.find();
        return res.status(200).json(allSongs);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// get a song by id
const getSong = async (req, res) => {
    const { songId } = req.params;
    if (songId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const song = await Song.findById(songId);
        if (!song) return res.status(404).json({ error: "Song not found" });

        return res.status(200).json(song);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// query songs by title, album, genre, language, and artist
const querySongs = async (req, res) => {
    const { title, album, genre, language, artist } = req.query;

    try {
        const filter = {};

        if (title) filter.title = { $regex: title, $options: "i" };  // case-insensitive
        if (album) filter.album = { $regex: album, $options: "i" };
        if (genre) filter.genre = { $regex: genre, $options: "i" };
        if (language) filter.language = { $regex: language, $options: "i" };
        if (artist) {
            const artistDoc = await Artist.findOne({ artist: { $regex: artist, $options: "i" } });
            if (!artistDoc) {
                return res.status(404).json({ message: "Artist not found" });
            }
            filter.artistId = artistDoc._id;
        }

        const songs = await Song.find(filter).populate("artistId", "artist");
        if (songs.length === 0) return res.status(404).json({ message: "No matching songs found" });

        return res.status(200).json(songs);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
};



export { getAllSongs, getSong, querySongs };
