const Category = require('../models/Category')
const { captilizeLetter, titleToPath } = require('../utils/utils')

module.exports = (app) => {

    const save = async (req, res) => {
        let numberOfTitles = null
        let err = null

        await Category.find({ title: req.body.title }, (err, docs) => {
            err = err
            numberOfTitles = { ...docs }
        })

        // erro ao executar o find
        if (err) return res.send(500).send({ msg: `Erro ao procurar categorias no banco de dados`, err })

        if (Object.keys(numberOfTitles).length > 0) {
            return res.status(409).send({ msg: 'Já existe uma categoria com esse título!' })
        }

        const newCategory = new Category({
            title: req.body.title,
            description: req.body.description,
            path: titleToPath(req.body.title),
            fatherCategory: req.body.fatherCategory === '' ? null : req.body.fatherCategory
        })

        newCategory.save((err) => {
            if (err) return res.status(500).send({ msg: `Erro ao adicionar a categoria no banco de dados`, err })

            // criado no banco de dados
            return res.status(201).send({ msg: `Categoria Adicionada com sucesso!` })
        })
    }

    const getCategories = (req, res) => {
        let err = null
        let categories = null

        Category.find()
            .then((categories) => {
                return res.status(200).send(categories)
            }).catch((err) => {
                console.log(err)
                return res.status(500).send({ msg: `Erro ao buscar as categorias`, err })
            })
    }

    const getByID = async (req, res) => {
        let err = null
        let category = null

        await Category.findById(req.params.id, (err, docs) => {
            err = err
            category = docs
        })

        if (err) return res.status(500).send({ msg: `Erro ao buscar a categoria`, err })

        res.status(200).send(category)
    }

    const remove = async (req, res) => {
        let err = null
        let category = null

        await Category.deleteOne({ '_id': req.params.id }, (err, docs) => {
            err = err
            category = docs
        })

        if (err) return res.status(500).send({ msg: 'Erro ao excluir a categoria do banco de dados', err })

        res.status(200).send({ msg: 'Categoria removida com sucesso!' })
    }

    app.category = {
        save,
        getCategories,
        getByID,
        remove
    }
}