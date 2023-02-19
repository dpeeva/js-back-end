const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String, required: true, unique: true,
        minlength: [2, "Username must be at least 2 characters long"]
    },
    email: {
        type: String, required: true, unique: true,
        minlength: [10, "Email must be at least 10 characters long"]
    },
    hashedPassword: { type: String, required: true }, // service generates the password
})

// needed for uniqueness of username
userSchema.index({
    username: 1, // use -1 for descending order
}, {
    collation: {
        locale: "en",
        strength: 2 // for case-insensitive
    }
})

userSchema.index({
    email: 1, // use -1 for descending order
}, {
    collation: {
        locale: "en",
        strength: 2 // for case-insensitive
    }
})

const User = model("User", userSchema)

module.exports = User