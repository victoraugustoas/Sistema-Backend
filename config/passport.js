const Author = require('../models/Author')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, async (payload, done) => {
        await Author.findById(payload._id)
            .then((author) => done(null, author ? { ...payload } : false))
            .catch((err) => done(err, false))
    })

    passport.use(strategy)

    app.passport = {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }

}