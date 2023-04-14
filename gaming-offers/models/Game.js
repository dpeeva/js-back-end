const { Schema, model, Types } = require("mongoose")


const URL_PATTERN = /^https?:\/\/.+$/i

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Game name must be at least 2 characters long"]
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => { URL_PATTERN.test(value) },
            message: "Path should start with http:// or https://"
        }
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"],
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "Description must be at least 10 characters long"],
    },
    genre: {
        type: String,
        required: true,
        minlength: [2, "Genre must be at least 2 characters long"],
    },
    platform: {
        type: String,
        required: true,
        enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
    },
    boughtBy: {
        type: [
            {
                userId: { type: Types.ObjectId, ref: "User" },
            }
        ],
    },
    owner: { type: Types.ObjectId, ref: "User", required: true }
})


const Game = model("Game", gameSchema)

module.exports = Game