const { Router } = require("express")

const router = Router()

router.get("/", (req, res) => {
    res.send(
        "<form method='POST'><input name='name'><button>Send</button></form>"
    )
})

// const middleware = (req, res, next) => {
//     console.log("Handling POST request")
//     console.log("Logging from middleware")
//     next()
// }

router.post("/",
    // (req, res, next) => middleware(req, res, next),
    (req, res) => {
        res.redirect("/catalog")
    }
)

module.exports = router
// module.exports = {
//     create: router,
//     middleware
// }