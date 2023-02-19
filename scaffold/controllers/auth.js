const { register, login } = require("../services/userService")
const { parseError } = require("../util/parser")

const authController = require("express").Router()

authController.get("/register", (req, res) => {
    // TODO: replace Register view according to assignment
    res.render("register", {
        title: "Register Page",
    })
})

authController.post("/register", async (req, res) => {
    // console.log(req.body)
    try {
        if (req.body.username == "" || req.body.password == "") {
            throw new Error("All fields are required")
        }
        if (req.body.password !== req.body.repass) {
            throw new Error("Passwords don't match")
        }
        const token = await register(req.body.username, req.body.password)

        // TODO: Check assignment, if register needs to create a session
        res.cookie("token", token)
        res.redirect("/") // TODO: Check if this is expected by assignment => replace with required redirect
    } catch (error) {
        console.log(error)
        // TODO: Add error parser
        // const errors = [error.message]
        const errors = parseError(error)

        // TODO: Add error display to actual template from assignment
        res.render("register", {
            title: "Register Page",
            errors,
            body: {
                username: req.body.username
            }
        })
    }
})

authController.get("/login", (req, res) => {
    // TODO: replace Login view according to assignment
    res.render("login", {
        title: "Login Page",
    })
})

authController.post("/login", async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password)
        res.cookie("token", token) // jwt
        res.redirect("/") // TODO: Check if this is expected by assignment => replace with required redirect
    } catch (error) {
        const errors = parseError(error)
        // TODO: Add error display to actual template from assignment
        res.render("login", {
            title: "Login Page",
            errors,
            body: {
                username: req.body.username,
            }
        })
    }
})

authController.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
})


module.exports = authController