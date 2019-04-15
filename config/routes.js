const multer = require('multer')
const multerConfig = require('./multerConfig')

module.exports = (app) => {
    app.route('/categories')
        .post(app.category.save)
        .get(app.category.getCategories)

    app.route('/categories/:id')
        .get(app.category.getByID)
        .delete(app.category.remove)

    app.route('/posts')
        .get(app.posts.getPosts)
        .post(multer(multerConfig).single('file'), app.posts.save)

    app.route('/posts/:id')
        .get(app.posts.getPostByID)
}