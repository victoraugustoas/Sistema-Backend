const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodbatlas-ymqp4.mongodb.net/test?retryWrites=true/${process.env.DB_NAME}`, { useNewUrlParser: true })
} else {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true })
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Conectado ao bd')
})

module.exports = app => {
    app.db = db
}

