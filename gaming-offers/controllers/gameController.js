const { getAll, create, getById, deleteById, update, buyGame } = require("../services/gameService")
const { parseError } = require("../util/parser")

const gameController = require("express").Router()


gameController.get("/", async (req, res) => {
    const games = await getAll()

    res.render("catalog", {
        user: req.user,
        games
    })
})

gameController.get("/:id/details", async (req, res) => {
    const game = await getById(req.params.id)

    let isBought = req.user && game.boughtBy.filter(item => item.userId.toString() === req.user._id.toString()).length

    if (!req.user) {
        game.canBuy = false
        game.isOwner = false
    }
    else if (game.owner._id.toString() == req.user._id.toString()) {
        game.isOwner = true
        game.canBuy = false
    }
    else if (isBought) {
        game.canBuy = false
    }
    else {
        game.canBuy = true
    }

    console.log(game)

    game.userId = req.user && req.user._id
    res.render("details", {
        game
    })
})

gameController.get("/create", (req, res) => {
    res.render("create", {})
})

gameController.post("/create", async (req, res) => {
    const game = {
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        description: req.body.description,
        genre: req.body.genre,
        platform: req.body.platform,
        owner: req.user._id,
    }

    try {
        if (Object.values(game).some(v => !v)) {
            throw new Error("All fields are required")
        }
        await create(game)
        res.redirect("/games")
    } catch (err) {
        res.render("create", {
            body: game,
            errors: parseError(err)
        })
    }
})

gameController.get("/:id/edit", async (req, res) => {
    const game = await getById(req.params.id)

    if (game.owner._id.toString() != req.user._id.toString()) {
        return res.redirect("/auth/login")
    }

    res.render("edit", {
        game
    })
})

gameController.post("/:id/edit", async (req, res) => {
    const game = await getById(req.params.id)

    if (game.owner._id.toString() != req.user._id.toString()) {
        return res.redirect("/auth/login")
    }

    const edited = {
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        description: req.body.description,
        genre: req.body.genre,
        platform: req.body.platform
    }

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error("All fields are required")
        }

        await update(req.params.id, edited)
        res.redirect(`/games/${req.params.id}/details`)
    } catch (err) {

        res.render("edit", {
            game: Object.assign(edited, { _id: req.params.id }),
            errors: parseError(err)
        })
    }
})

gameController.get("/:id/delete", async (req, res) => {
    const game = await getById(req.params.id)

    if (game.owner._id.toString() != req.user._id.toString()) {
        return res.redirect("/auth/login")
    }

    await deleteById(req.params.id)
    res.redirect("/games")
})

gameController.get("/:id/buy", async (req, res) => {
    const game = await getById(req.params.id)

    try {
        if (game.owner._id.toString() == req.user._id.toString()) {
            game.isOwner = true
            throw new Error("Cannot buy your own game")
        }

        await buyGame(req.params.id, req.user._id)
        res.redirect(`/games/${req.params.id}/details`)
    } catch (err) {
        res.render("details", {
            game,
            errors: parseError(err)
        })
    }

})

module.exports = gameController