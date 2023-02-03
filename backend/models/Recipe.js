const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  preparation: {
    type: String,
  },
  yield: {
    type: String,
  },
  keywords: {
    type: String,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ingredient',
    },
  ],
})

module.exports = Recipe = mongoose.model('recipe', RecipeSchema)
