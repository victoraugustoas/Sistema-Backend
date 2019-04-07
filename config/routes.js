module.exports = (app) => {
    app.route('/categories')
        .post(app.category.save)
}