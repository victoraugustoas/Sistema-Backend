const Category = require('../models/Category')
const { captilizeLetter, titleToPath } = require('../utils/utils')

module.exports = (app) => {

    const save = async (req, res) => {
        let numberOfTitles = null
        let err = null

        await Category.find({ title: req.body.title }, (err, docs) => {
            if (err) {
                err = err
            } else {
                numberOfTitles = { ...docs }
            }
        })

        // erro ao executar o find
        if (err) return res.send(500).send(err)

        if (Object.keys(numberOfTitles).length > 0) {
            return res.status(409).send('Já existe uma categoria com esse título!')
        }

        const newCategory = new Category({
            title: req.body.title,
            description: req.body.description,
            path: titleToPath(req.body.title),
            fatherCategory: req.body.fatherCategory === '' ? null : req.bod.fatherCategory
        })

        newCategory.save((err) => {
            if (err) return res.status(500).send(err)

            // criado no banco de dados
            return res.status(201).send()
        })
    }

    const getCategories = async (req, res) => {
        let err = null
        let categories = null

        await Category.find({}, (err, docs) => {
            if (err) {
                err = err
            } else {
                categories = docs
            }
        })

        if (err != null) res.status(500).send(err)

        res.status(200).send(categories)
    }

    const getByID = async (req, res) => {
        let err = null
        let category = null

        await Category.find({ '_id': req.params.id })
    }

    app.category = {
        save,
        getCategories,
        getByID
    }
}