import mongoose from "mongoose";


const Schema = mongoose.Schema;


const ArtistSchema = new Schema({
    artist: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
        unique: true
    }
});

ArtistSchema.pre("findOneAndDelete", async function (next) {
    try {
        const artist = await this.model.findOne(this.getFilter());
        if (artist) {
            await mongoose.model("Song").deleteMany({ artistId: artist._id });
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Artist = mongoose.model("Artist", ArtistSchema);


export default Artist;
