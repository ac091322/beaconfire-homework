import Artist from "../models/artistModel.js";


// get all artists
const getAllArtists = async (_req, res) => {
    try {
        const allArtists = await Artist.find();
        return res.status(200).json(allArtists);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// get an artist by id
const getArtist = async (req, res) => {
    const { artistId } = req.params;
    if (artistId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const artist = await Artist.findById(artistId);
        if (!artist) return res.status(404).json({ error: "Artist not found" });

        return res.status(200).json(artist);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// create an artist
const createArtist = async (req, res) => {
    try {
        const createArtist = await Artist.create(req.body);
        return res.status(201).json(createArtist);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}

// delete an artist by id
const deleteArtist = async (req, res) => {
    const { artistId } = req.params;
    if (artistId.length !== 24) return res.status(409).json({ Error: "ID not proper format" });

    try {
        const artistToDelete = await Artist.findByIdAndDelete(artistId);
        if (!artistToDelete) return res.status(404).json({ Error: "Artist not found" });

        return res.status(200).send(`${artistToDelete.artist} deleted from database`);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
}


export { getAllArtists, getArtist, createArtist, deleteArtist };
