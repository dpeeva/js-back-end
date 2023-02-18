const { Router } = require("express")

const router = Router()

router.get("/create", (req, res) => {
    res.send(
        "<form method='POST'><input name='name'><button>Send</button></form>"
    )
})

router.post("/create", (req, res) => {
    console.log("Handling POST request")
    res.redirect("/catalog")
})

module.exports = router