// const validator = require("validator")
const { register, login } = require("../services/userService")
const { parseError } = require("../util/parser")

const authController = require("express").Router()

authController.get("/register", (req, res) => {
    res.render("register", {
        title: "Register Page",
    })
})

authController.post("/register", async (req, res) => {
    // console.log(req.body)
    try {
        // if (validator.isEmail(req.body.email) == false) {
        //     throw new Error("Invalid email")
        // }
        if (req.body.username == "" || req.body.password == "") {
            throw new Error("All fields are required")
        }
        if (req.body.email.length < 10) {
            throw new Error("Email must be at least 10 characters long")
        }
        if (req.body.password.length < 4) {
            throw new Error("Password must be at least 4 characters long")
        }
        if (req.body.password !== req.body.repass) {
            throw new Error("Passwords don't match")
        }
        const token = await register(req.body.username, req.body.password)

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
        res.cookie("token", token)
        res.redirect("/") // redirect to home upon login
    } catch (error) {
        const errors = parseError(error)
        res.render("login", {
            title: "Login Page",
            errors,
            body: {
                email: req.body.email,
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