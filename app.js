const express = require('express')
const app = express()

// variáveis de ambiente
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Backend funcionando na porta ${process.env.PORT}`)
})