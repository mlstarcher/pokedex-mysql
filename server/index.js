const express = require('express')
const morgan = require('morgan')
const path = require('path')
const db = require('./db')

const port = 3000
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get('/pokemon', (req, res) => {
  db.getAll((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/types', (req, res) => {
  db.getTypes((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.put('/pokemon/:id', (req, res) => {
  db.updateName(req.params.id, req.body.name, (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.delete('/pokemon/:id', (req, res) => {
  db.delete(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send('error: ', err)
    } else {
      res.status(200).send('Pokemon Deleted')
    }
  })
})

app.listen(port, () => {
  console.log(`Server is up and at 'em, listening on port ${port}`)
})