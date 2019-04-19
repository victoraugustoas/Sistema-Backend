const Post = require('../models/Post')
const path = require('path')

module.exports = app => {

    const save = async (req, res) => {
        let err = null
        let category = null
        let image = null

        if (!req.body.category) return res.status(400).send({ msg: `Selecione uma categoria para o post!` })
        await Post.findById(req.body.category, (err, doc) => {
            err = err
            category = doc
        })

        if (err) return res.status(500).send({ msg: `Erro ao adicionar post no banco de dados`, err })
        if (req.body.content.length < 100) return res.status(400).send({ msg: `Conteúdo menor que 100 caracteres!` })

        await app.cloudinary.uploader.upload(req.file.path, (err, img) => {
            err = err
            image = img
        })

        if (err) return res.status(500).send({ err })

        let newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            image: image.url,
            category: req.body.category
        })

        // salva no banco de dados o post
        newPost.save((err) => {
            if (err) return res.status(500).send({ msg: `Erro ao adicionar o post no banco de dados`, err })

            // criado no banco de dados
            return res.status(201).send({ msg: `Post criado com sucesso!` })
        })
    }

    const getPosts = async (req, res) => {
        let err = null
        let posts = null

        await Post.find(
            {},
            {
                // projeção
                title: 1,
                image: 1,
                category: 1,
                createdAt: 1
            }
        ).then((posts) => {
            return res.status(200).send(posts)
        }).catch((err) => {
            console.log({ err })
            return res.status(500).send({ msg: `Erro ao buscar posts no banco de dados`, err })
        })
    }

    const getPostByID = async (req, res) => {
        let err = null
        let post = null

        await Post.findById(req.params.id, (err, docs) => {
            err = err
            post = docs
        })

        if (err) return res.status(500).send({ msg: `Erro ao buscar post no banco de dados`, err })

        res.status(200).send(post)
    }

    app.posts = {
        save,
        getPosts,
        getPostByID,
    }
}