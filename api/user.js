const bcrypt = require('bcrypt')

module.exports = app => {

    const { errorNotExist, errorExist } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        try {
            errorNotExist(user.email, 'E-mail não informado')
            errorNotExist(user.password, 'Senhã não informada')

            const userFromDB = await app.db('users')
                .where({ email: user.email })
                .first()

            errorExist(userFromDB, 'Usuário já existe')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)

        app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'email', 'password')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getEmail = (req, res) => {
        const emailUser = req.params.email

        app.db('users')
            .select('id', 'email')
            .where({ email: emailUser })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getEmail }
}   