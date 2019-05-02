const Author = require('../models/Author')
const bcrypt = require('bcrypt')

module.exports = app => {
    const save = async (req, res) => {
        let authorFromDB = null
        let err = null
        let image = null

        let { firstName, lastName, email, password } = req.body

        // erro de falta de informações
        if (!firstName) return res.status(400).send({ msg: `Informe o primeiro nome` })
        if (!lastName) return res.status(400).send({ msg: `Informe o último nome` })
        if (!email) return res.status(400).send({ msg: `Informe um e-mail válido` })
        if (!password) return res.status(400).send({ msg: `Informe uma senha` })

        // procura por outros autores com o mesmo email
        await Author.find({ email: email })
            .then((authors) => {
                authorFromDB = { ...authors }
            })
            .catch((err) => {
                err = err
            })

        if (err) return res.status(500).send({ msg: `Houve um erro interno, tente novamente mais tarde`, err })
        if (authorFromDB && Object.keys(authorFromDB).length > 0) {
            return res.status(409).send({ msg: 'Já existe um autor com esse email!' })
        }

        await app.cloudinary.uploader.upload(req.file.path, (err, img) => {
            err = err
            image = img
        })

        if (err) return res.send(500).send({ msg: `Ocorreu um erro ao salvar a imagem`, err })

        password = `${password}${process.env.BACKEND_SECRET}`
        await bcrypt.hash(password, parseInt(process.env.SALT))
            .then(function (hash) {
                password = hash
            })
            .catch((err) => {
                err = err
            })

        if (err) return res.status(500).send({ msg: `Houve um erro interno, tente novamente mais tarde`, err })

        let newAuthor = new Author({
            firstName,
            lastName,
            email,
            image: image.secure_url,
            password
        })

        newAuthor.save()
            .then((resp) => {
                return res.status(201).send({ msg: `Autor adicionado com sucesso!`, resp })
            })
            .catch((err) => {
                return res.status(500).send({ msg: `Erro ao cadastrar o autor, tente novamente mais tarde `, err })
            })
    }

    const getAuthorByID = async (req, res) => {
        let { id } = req.params

        await Author.findById({ _id: id })
            .then((author) => {
                res.status(200).send(author)
            })
            .catch((err) => {
                res.status(500).send({ msg: `Houve um erro interno, tente novamente mais tarde`, err })
            })
    }

    app.author = {
        save,
        getAuthorByID
    }
}