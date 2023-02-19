const { Schema, model } = require("mongoose")

// TODO: Add user properties and validation, according to assignment
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, "Username must be at least 3 characters long"] }, // check if required in assignments
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

const User = model("User", userSchema)

module.exports = User