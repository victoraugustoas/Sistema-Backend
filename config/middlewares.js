const bodyParser = require('body-parser')
const { captilizeLetter } = require('../utils/utils')
const cors = require('cors')

module.exports = (app) => {

    // habilita a api para uso externo
    app.use(cors())

    // faz o parser dos objetos json
    app.use(bodyParser.json())

    // se possuir titulo e descrição, coloca a primeira letra maiúscula
    app.use((req, res, next) => {

        if (req.body.title && req.body.description) {
            req.body.title = captilizeLetter(req.body.title)
            req.body.description = captilizeLetter(req.body.description)
        }

        next()
    })

}