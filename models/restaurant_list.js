const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantList = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  }
})