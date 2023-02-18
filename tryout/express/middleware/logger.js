module.exports = () => (req, res, next) => {
    console.log("Apply Middleware to every URL address of the App")
    console.log(">>>", req.method, req.url)
    next()
}