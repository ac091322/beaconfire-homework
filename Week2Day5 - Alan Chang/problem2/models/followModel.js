import mongoose from "mongoose";


const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    followerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    }
});

const Follow = mongoose.model("Follow", FollowSchema);


export default Follow;
