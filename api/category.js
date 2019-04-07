
module.exports = (app) => {
    const save = (req, res) => {
        res.send(req.body)
    }

    app.category = {
        save,
    }
}