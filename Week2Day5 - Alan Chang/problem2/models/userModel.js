import mongoose from "mongoose";
import validator from "validator";


const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 2,
        maxlength: 25,
        required: true,
        unique: true
    },
    email: {
        type: String,
        minlength: 8,
        maxlength: 50,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 64,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);


export default User;
