import mongoose from "mongoose";


const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    album: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    language: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
    },
    artistId: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        require: true,
    }
});

const Song = mongoose.model("Song", SongSchema);


export default Song;
