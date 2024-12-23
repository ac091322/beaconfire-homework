import Song from "../models/songModel.js";


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


export { getAllSongs, getSong };
