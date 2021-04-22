const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/project1', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.use('/public', express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})


app.use('/articles', articleRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})