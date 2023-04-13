const Pet = require("../models/Pet")

async function getAll() {
    return Pet.find(
        {}
    ).populate({
        path: "owner",
        select: "username"
    }).lean()
}

async function getById(id) {
    return Pet.findById(id).populate({
        path: "owner",
        select: "username"
    }).lean()
    // TODO: add .populate("commentList")
}

async function getUserPets(userId) {
    return await Pet.find({
        owner: userId
    }).lean()
}

async function create(pet) {
    return await Pet.create(pet)
}

async function update(id, pet) {
    const existing = await Pet.findById(id)

    existing.name = pet.name
    existing.image = pet.image
    existing.age = pet.age
    existing.description = pet.description
    existing.location = pet.location

    await existing.save()
}

async function deleteById(id) {
    await Pet.findByIdAndRemove(id)
}

async function addComment(petId, userId, comment) {
    const pet = await Pet.findById(petId)

    pet.commentList.push({
        userId,
        comment
    })
    await pet.save()
}

module.exports = {
    getAll,
    getById,
    getUserPets,
    create,
    update,
    deleteById,
    addComment
}