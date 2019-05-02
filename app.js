const express = require('express')
const app = express()
const cloudinary = require('cloudinary').v2

// ENV VARIABLES
require('dotenv').config()

// CONFIG
require('./config/db')(app) //DATABASE
require('./config/middlewares')(app)
require('./config/passport')(app)
const cloudinaryConfig = require('./config/cloudinaryConfig')() //CLOUDINARY
cloudinary.config(cloudinaryConfig)
app.cloudinary = cloudinary

// API
const category = require('./api/category')(app)
const post = require('./api/post')(app)
const author = require('./api/author')(app)

// ROUTES
const routes = require('./config/routes')(app)

app.listen(process.env.PORT, () => {
    console.log(`Backend funcionando na porta ${process.env.PORT}`)
})