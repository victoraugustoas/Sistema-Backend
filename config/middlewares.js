const bodyParser = require('body-parser')
const { captilizeLetter } = require('../utils/utils')

module.exports = (app) => {

    app.use(bodyParser.json())

    app.use((req, res, next) => {

        if (req.body.title && req.body.description) {
            req.body.title = captilizeLetter(req.body.title)
            req.body.description = captilizeLetter(req.body.description)
        }

        next()
    })

}