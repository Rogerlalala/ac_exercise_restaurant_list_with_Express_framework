// Mongoose
const mongoose = require('mongoose')
const RestaurantList = require('../restaurant_list')
const restaurantsList = require('../../restaurant.json')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantsList.results.forEach(restaurant => {
    RestaurantList.create({
      name: restaurant.name
    })
  })
  console.log('done!')
})