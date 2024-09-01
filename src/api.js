//==================================================\\

// ~~ Requires.
const express = require('express')
const mysql = require('mysql2')
require('dotenv').config()
const api = express()

//==================================================\\

// ~~ Connecting to database.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQLPASSWORD,
    database: 'galaxy-notes'
})
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err)
        return
    }
    console.log('Conectado ao banco de dados.')
})

//==================================================\\

// ~~ Get books.
api.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Erro ao buscar cadernos: ', err)
            return
        }
        res.json(results)
    })
})

//==================================================\\

// ~~ Get notes.
api.get('/notes/:frombook', (req, res) => {
    const frombook = req.params.frombook
    db.query('SELECT * FROM notes WHERE frombook = ?', [frombook], (err, results) => {
        if (err) {
            console.error('Erro ao buscar notas: ', err)
            return
        }
        res.json(results)
    })
})

//==================================================\\

// ~~ Running API.
const PORT = 3000
api.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}.`)
});

//==================================================\\