const bodyParser = require('body-parser')
const { captilizeLetter } = require('../utils/utils')
const cors = require('cors')
const express = require('express')
const path = require('path')

module.exports = (app) => {

    // habilita a api para uso externo
    app.use(cors())

    // Removendo cache
    express.response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    express.response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    express.response.setHeader("Expires", "0"); // Proxies.

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

    // torna a pasta uploads pública para entregar os arquivos
    app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')))
}