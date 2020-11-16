const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantListSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Restaurants', restaurantListSchema)