const Post = require('../models/Post')

module.exports = app => {

    const save = async (req, res) => {
        let err = null
        let category = null

        if (!req.body.category) return res.status(400).send({ msg: `Selecione uma categoria para o post!` })
        await Post.findById(req.body.category, (err, doc) => {
            err = err
            category = doc
        })

        if (err) return res.status(500).send({ msg: `Erro ao adicionar post no banco de dados`, err })
        if (req.body.content.length < 100) return res.status(400).send({ msg: `Conteúdo menor que 100 caracteres!` })

        let newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            image: req.file.filename,
            category: req.body.category
        })

        res.status(201).send({ msg: `Post criado com sucesso!` })
    }

    const getPosts = async (req, res) => {
        let err = null
        let posts = null

        await Post.find({}, (err, docs) => {
            err = err
            posts = docs
        })

        if (err) return res.status(500).send({ msg: `Erro ao buscar posts no banco de dados`, err })

        res.status(200).send(posts)
    }

    app.posts = {
        save,
        getPosts,
    }
}