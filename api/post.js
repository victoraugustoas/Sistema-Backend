const Post = require('../models/Post')

module.exports = app => {

    const save = (req, res) => {
        res.send({ msg: 'Teste' })
    }

    app.post = {
        save,
    }
}