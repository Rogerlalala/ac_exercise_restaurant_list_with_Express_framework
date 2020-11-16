// Include package used in project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Restaurants = require('./models/restaurantList')
const bodyParser = require('body-parser')
const port = 3000
const exphbs = require('express-handlebars')
//const restaurantsList = require('./restaurant.json')

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting static files and body-parser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extend: true }))

// Mongoose
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// Setting route
// Home page
app.get(`/`, (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurants => res.render(`index`, { restaurants }))
    .catch(error => console.log(error))
})
// New function
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
// Create function
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurants.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Show function
//app.get(`/restaurants/:restaurant_id`, (req, res) => {
//  const restaurant = restaurantsList.results.find(restaurant =>
//    restaurant.id.toString() === req.params.restaurant_id
//  )
//  res.render('show', { restaurant: restaurant })
//})
// Search function
//app.get(`/search`, (req, res) => {
//  const keyword = req.query.keyword
//  const restaurants = restaurantsList.results.filter(restaurant => {
//    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//  })
//  res.render('index', { restaurants: restaurants, keyword: keyword })
//})



// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})