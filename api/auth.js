const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const { authSecret } = require('../.env')

module.exports = app => {
    const login = async (req, res) => {
        const user = { ...req.body }

        if (!user.email || !user.password) {
            return res.status(400).send('Informe email e senha')
        }

        console.log(user)

        let userFromDB = await app.db('users')
            .where({ email: user.email })
            .first()
            .catch(err => res.status(500).send(err))

        if (!userFromDB) {
            // usuário não existe
            return res.status(400).send('Usuário não encontrado')
        }

        const compare = bcrypt.compareSync(user.password, userFromDB.password)

        if (!compare) {
            res.status(401).send('Email ou senha não conferem!')
        }

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            id: user.id,
            email: user.email,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({ payload: jwt.encode(payload, authSecret) })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null

        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {

        }

        res.send(false)
    }

    return { login, validateToken }
}