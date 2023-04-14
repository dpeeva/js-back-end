const Game = require("../models/Game")

async function getAll() {
    return Game
        .find({})
        .populate({ path: "owner", select: "username" })
        .lean()
}

async function getById(id) {
    return Game
        .findById(id)
        .populate({ path: "owner", select: "username" })
        .lean()
}

async function getUsergames(userId) {
    return await Game.find({ owner: userId }).lean()
}

async function create(game) {
    return await Game.create(game)
}

async function update(id, game) {
    const existing = await Game.findById(id)

    existing.name = game.name
    existing.image = game.image
    existing.price = game.price
    existing.description = game.description
    existing.genre = game.genre
    existing.platform = game.platform

    await existing.save()
}

async function deleteById(id) {
    await Game.findByIdAndRemove(id)
}

async function buyGame(gameId, userId) {
    const game = await Game.findById(gameId)

    game.boughtBy.push({ userId })
    await game.save()
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    buyGame,
    getUsergames
}