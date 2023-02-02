const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipe',
  },
  input: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  unitOfMeasure: {
    type: String,
  },
  name: {
    type: String,
  },
  modifier: {
    type: String,
  },
  preparation: {
    type: String,
  },
})

module.exports = Ingredient = mongoose.model('ingredient', IngredientSchema)
