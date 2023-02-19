const Pet = require("../models/Pet")

async function getAll() {
    return Pet.find({})
}

async function getById(id) {
    return Pet.findById(id).lean()
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

async function addComment(petId, userId) {
    const pet = await Pet.findById(petId)

    pet.commentList.push(userId)
    await pet.save()
}

async function deletePhoto(petId, userId) {
    //
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    addComment
}