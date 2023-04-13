const { hasUser } = require("../middlewares/guards")
const { getUserPets } = require("../services/petService")

const profileController = require("express").Router()

profileController.get("/", hasUser(), async (req, res) => {
    const pets = await getUserPets(req.user._id)

    // console.log(pets)

    res.render("profile", {
        title: "Profile Page",
        user: Object.assign({ pets }, req.user),
    })
})

module.exports = profileController