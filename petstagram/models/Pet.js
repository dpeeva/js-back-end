const { Schema, model, Types } = require("mongoose")

const URL_PATTERN = /^https?:\/\/.+$/i

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Name should be at least 2 characters long"]
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => { URL_PATTERN.test(value) },
            message: "Path should start with http:// or https://"
        }
    },
    age: {
        type: Number,
        required: true,
        min: [1, "Age should not be less than 1 characters long"],
        max: [100, "Age should not be more than 100 characters long"]
    },
    description: {
        type: String,
        required: true,
        minlength: [5, "Description should not be less than 5 characters long"],
        maxlength: [50, "Description should not be more than 50 characters long"]
    },
    location: {
        type: String,
        required: true,
        minlength: [5, "Location should not be less than 5 characters long"],
        maxlength: [50, "Location should not be more than 50 characters long"]
    },
    commentList: {
        type: [
            {
                userId: {
                    type: Types.ObjectId,
                    ref: "User",
                },
                comment: {
                    type: String
                }
            }
        ]
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    } // reference
})

const Pet = model("Pet", petSchema)

module.exports = Pet