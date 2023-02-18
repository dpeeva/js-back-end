const { Router } = require("express")

const router = Router()

router.get("/catalog", (req, res) => {
    res.send(
        res.send("Catalog Page")
    )
})

router.get("/catalog/:productId", (req, res) => {
    console.log(req.params.productId)
    res.send("Product Details Page")
})

router.get("/catalog/:category/:id", (req, res) => {
    console.log(req.params)
    res.send("Nested Parameters: " + req.params.category + ", " + req.params.id)
})

module.exports = router