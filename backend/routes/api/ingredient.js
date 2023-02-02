const express = require('express')
const auth = require('../../middleware/auth')
const Ingredient = require('../../models/Ingredient')
const ingredientParser = require('../../services/ingredientParser')

const unitsOfMeasure = [
  ['$1 can', ['([0-9]+.ounce).*can']],
  ['$1 slice', ['([0-9]+.ounce).*slice']],
  ['tsp', ['teaspoons', 'teaspoon', 'tsp']],
  ['tbs', ['tablespoons', 'tablespoon', 'tbs']],
  ['cup', ['cups', 'cup']],
  ['oz', ['ounces', 'ounce', 'oz']],
  ['pint', ['pints', 'pint']],
  ['qt', ['quarts', 'quart', 'qt']],
  ['gallon', ['gallons', 'gallon']],
  ['lb', ['pounds', 'pound', 'lb']],
  ['handful', ['handful']],
  ['dash', ['dash']],
  ['pinch', ['pinch']],
  ['stick', ['(stick)[s]*']],
  ['clove', ['(clove)[s]*']],
  ['bottle', ['(bottle)[s]*']],
]
const foodPreparations = ['diced']
const foodModifiers = ['small', 'medium', 'large']
const foodData = ['avocado', 'crushed tomatoes', 'butter', 'yellow onion']

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { input } = req.body
  try {
    const ingredient = new Ingredient(
      ingredientParser.parse(input, unitsOfMeasure, foodPreparations, foodModifiers, foodData)
    )
    res.json(ingredient)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
