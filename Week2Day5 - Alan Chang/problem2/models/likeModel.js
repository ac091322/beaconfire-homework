import mongoose from "mongoose";


const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: "Song",
        required: true
    }
});

LikeSchema.index({ user: 1, song: 1 }, { unique: true });

const Like = mongoose.model("Like", LikeSchema);


export default Like;
