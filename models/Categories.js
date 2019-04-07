const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const categoriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    path: {
        type: String,
        required: true
    },
    fatherCategory: ObjectId
})

module.exports = mongoose.model('Categories', categoriesSchema)