module.exports = (app) => {
    app.route('/categories')
        .post(app.category.save)
        .get(app.category.getCategories)

    app.route('/categories/:id')
        .get(app.category.getByID)
}