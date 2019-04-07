const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    fatherCategory: {
        type: ObjectId,
        default: null
    }
})

module.exports = mongoose.model('Categories', categorySchema)