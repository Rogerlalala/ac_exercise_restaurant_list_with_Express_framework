// Include package used in project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting static files
app.use(express.static('public'))

// Setting route
// Home page
app.get(`/`, (req, res) => {
  res.render(`index`, { restaurants: restaurantsList.results })
})
// Show page
app.get(`/:restaurant_id`, (req, res) => {
  const restaurant = restaurantsList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})