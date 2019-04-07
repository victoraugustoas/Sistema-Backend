const express = require('express')
const app = express()

// ENV VARIABLES
require('dotenv').config()

// MIDDLEWARES
require('./config/middlewares')(app)

// API
const category = require('./api/category')(app)

// ROUTES
const routes = require('./config/routes')(app)

app.listen(process.env.PORT, () => {
    console.log(`Backend funcionando na porta ${process.env.PORT}`)
})