const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const JWT_SECRET = "secret_string"

async function register(email, username, password) {
    const existingUsername = await User.findOne({ username }).collation(
        { locale: "en", strength: 2 }
    )
    if (existingUsername) {
        throw new Error("Username is taken")
    }

    // console.log(password, email, username)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        email,
        username,
        hashedPassword
    })

    const token = createSession(user)
    return token
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation(
        { locale: "en", strength: 2 }
    )
    if (!user) {
        throw new Error("Incorrect username or password")
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword)
    if (hasMatch == false) {
        throw new Error("Incorrect username or password")
    }

    const token = createSession(user)
    return token
}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    }

    const token = jwt.sign(payload, JWT_SECRET)
    return token
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}


module.exports = {
    register,
    login,
    verifyToken
}
