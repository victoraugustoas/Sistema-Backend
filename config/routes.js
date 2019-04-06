module.exports = app => {
    app.post('/login', app.api.auth.login)
    app.post('/validateToken', app.api.auth.validateToken)
    
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/:email')
        .get(app.api.user.getEmail)
}