const multer = require('multer')
const multerConfig = require('./multerConfig')

module.exports = (app) => {
    app.route('/signup')
        .post(multer(multerConfig).single('file'), app.author.save)
    app.route('/signin')
        .post(app.author.signin)
    app.route('/validateToken')
        .post(app.author.validateToken)

    app.route('/categories')
        .get(app.category.getCategories)
        .all(app.passport.authenticate())
        .post(app.category.save)

    app.route('/categories/:id')
        .get(app.category.getByID)
        .all(app.passport.authenticate())
        .delete(app.category.remove)

    app.route('/posts')
        .get(app.posts.getPosts)
        .all(app.passport.authenticate())
        .post(multer(multerConfig).single('file'), app.posts.save)

    app.route('/posts/:id')
        .get(app.posts.getPostByID)

    app.route('/author/:id')
        .all(app.passport.authenticate())
        .get(app.author.getAuthorByID)
}