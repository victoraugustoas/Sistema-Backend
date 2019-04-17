const express = require('express')
const app = express()
const cloudinary = require('cloudinary').v2

// ENV VARIABLES
require('dotenv').config()

// DATABASE
require('./config/db')(app)

// CLOUDINARY
const cloudinaryConfig = require('./config/cloudinaryConfig')()
cloudinary.config(cloudinaryConfig)
app.cloudinary = cloudinary

// MIDDLEWARES
require('./config/middlewares')(app)

// API
const category = require('./api/category')(app)
const post = require('./api/post')(app)

// ROUTES
const routes = require('./config/routes')(app)

app.listen(process.env.PORT, () => {
    console.log(`Backend funcionando na porta ${process.env.PORT}`)
})