const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const port = 8080

const Film = mongoose.model('Film', {
  title: String,
  description: String,
  imageUrl: String,
  trailerUrl: String
})

app.get('/', async (req, res) => {
  const films = await Film.find()
  res.send(films)
})

app.delete('/:id', async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id)
  return res.send(film)
})

app.put('/:id', async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    trailerUrl: req.body.trailerUrl
  }, {
    new: true
  })

  return res.send(film)
})

app.post('/', async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    trailerUrl: req.body.trailerUrl
  })
  await film.save()
  res.send(film)
})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://joel:QPMZwonx1209_@cluster0.myehblo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  console.log('app running')
})