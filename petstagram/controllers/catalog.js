const { getById, deleteById, addPhoto, getAll, create } = require("../services/petService")
const { parseError } = require("../util/parser")

const catalogController = require("express").Router()

catalogController.get("/", async (req, res) => {
    const pets = await getAll()

    res.render("catalog", {
        title: "Catalog Page",
        user: req.user,
        pets,
    })
})

catalogController.get("/:id/details", async (req, res) => {
    const pet = await getById(req.params.id)

    if (!req.user) {
        pet.isOwner = false
    }

    if (pet.owner._id.toString() == req.user._id.toString()) {
        pet.isOwner = true
    }

    res.render("details", {
        title: "Pet Details",
        pet,
    })
})

catalogController.get("/create", async (req, res) => {
    res.render("create", {})
})

catalogController.post("/create", async (req, res) => {
    const pet = {
        name: req.body.name,
        image: req.body.image,
        age: Number(req.body.age),
        description: req.body.description,
        location: req.body.location,
        owner: req.user._id,
    }

    try {
        if (Object.values(pet).some(v => !v)) {
            throw new Error("All fields are required!")
        }
        await create(pet)
        res.redirect("/catalog")
    } catch (error) {
        res.render("create", {
            title: "Create Pet",
            body: pet,
            errors: parseError(error),
        })
    }
})

catalogController.get("/:id/edit", async (req, res) => {
    const pet = await getById(req.params.id)
    if (pet.owner != req.user._id) {
        return res.redirect("/auth/login")
    }

    res.render("edit", {
        title: "Edit Pet",
        pet
    })
})

catalogController.get("/:id/edit", async (req, res) => {
    const pet = await getById(req.params.id)
    if (pet.owner._id.toString() != req.user._id.toString()) {
        return res.redirect("/auth/login")
    }

    res.render("edit", {
        title: "Edit Pet",
        pet
    })
})

catalogController.post("/:id/edit", async (req, res) => {
    const pet = await getById(req.params.id)

    if (pet.owner._id.toString() != req.user._id.toString()) {
        return res.redirect("/auth/login")
    }

    // res.render("edit", {
    //     title: "Edit Pet",
    //     pet
    // })

    const edited = {
        name: req.body.name,
        image: req.body.image,
        age: Number(req.body.age),
        description: req.body.description,
        location: req.body.location,
    }

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error("All fields are required!")
        }
        await update(req.params.id, edited)
        res.redirect(`/catalog/${req.params.id}/details`)
    } catch (error) {
        res.render("edit", {
            title: "Edit Pet",
            pet: Object.assign(edited, {
                _id: req.params.id
            }),
            errors: parseError(error),
        })
    }
})

catalogController.get("/:id/delete", async (req, res) => {
    const pet = await getById(req.params.id)
    if (pet.owner._id.toString() != req.user._id.toString()) {
        return res.redirect("/auth/login")
    }

    await deleteById(req.params.id)
    res.redirect("/catalog")
})

// catalogController.get("/:id/pet", async (req, res) => {
//     const pet = await getById(req.params.id)
//     try {
// 
//         if (pet.owner == req.user._id) {
//             pet.isOwner = true
//             throw new Error("Cannot add a pet")
//         }
// 
//         await addComment(req.params.id, req.user._id)
//         res.redirect(`/catalog/${req.params.id}/details`)
//     } catch (error) {
//         res.render("create", {
//             title: "Create Pet",
//             pet,
//             errors: parseError(error),
//         })
//     }
// })


module.exports = catalogController
