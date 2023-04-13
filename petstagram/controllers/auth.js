const { body, validationResult } = require("express-validator")
const { register, login } = require("../services/userService")
const { parseError } = require("../util/parser")

const authController = require("express").Router()

authController.get("/register", (req, res) => {
    res.render("register", {
        title: "Register Page",
    })
})

authController.post(
    "/register",
    body("password").isLength(
        { min: 4 }
    ).withMessage(
        "Password must be at least 4 characters long"
    ),
    async (req, res) => {
        // console.log(req.body)
        try {
            const { errors } = validationResult(req)
            if (errors.length > 0) {
                throw errors
            }

            if (req.body.password !== req.body.repass) {
                throw new Error("Passwords don\'t match")
            }

            const token = await register(req.body.email, req.body.username, req.body.password)

            res.cookie("token", token)
            res.redirect("/")
        } catch (error) {
            console.log(error)
            const errors = parseError(error)

            res.render("register", {
                title: "Register Page",
                errors,
                body: {
                    email: req.body.email,
                    username: req.body.username
                }
            })
        }
    })

authController.get("/login", (req, res) => {
    res.render("login", {
        title: "Login Page",
    })
})

authController.post("/login", async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password)
        res.cookie("token", token) // breaking
        res.redirect("/") // redirect to home upon login
    } catch (error) {
        console.log(error)
        const errors = parseError(error)
        res.render("login", {
            title: "Login Page",
            errors,
            body: {
                // email: req.body.email,
                username: req.body.username,
            }
        })
    }
})

authController.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/") // redirect to home upon logout
})


module.exports = authController