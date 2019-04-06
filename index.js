const express = require('express')
const app = express()
const consign = require('consign')
const database = require('./config/db')
const env = require('./.env')


// configurações do banco de dados
// visível para toda a aplicação usando a variável app.db
app.db = database

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3001, () => (
    console.log("Backend funcionando ...")
))