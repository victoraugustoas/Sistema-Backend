module.exports = {
    titleToPath(title) {
        return ('/').concat(title.replace(' ', '-').toLowerCase())
    },
    captilizeLetter(title) {
        return title.charAt(0).toUpperCase() + title.slice(1)
    }
}