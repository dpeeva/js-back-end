const { Schema, model } = require("mongoose")

const personSchema = new Schema({
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        required: true,
        min: [0, "Age cannot be negative"]
    }
})

personSchema.methods.sayHi = function () {
    return `${this.firstName} says hi!`
}

personSchema.virtual("name").get(function () {
    return `${this.firstName} ${this.lastName}`
})

const Person = model("Person", personSchema)

module.exports = Person