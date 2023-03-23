const express = require('express')
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const Recipe = require('../../models/Recipe')

const router = express.Router()

const validators = [
  check('title', 'validation.recipe.title.required').exists(),
  check('description', 'validation.recipe.description.required').exists(),
  check('preparation', 'validation.recipe.preparation.required').exists(),
]

router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id })
    res.json(recipes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

router.post('/', validators, auth, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id, title, description, preparation, keywords } = req.body
  if (id) {
    return res
      .status(400)
      .json({ message: 'Use put to update the record or remove the id to duplicate it.' })
  }

  try {
    const recipe = new Recipe({
      user: req.user.id,
      title,
      description,
      preparation,
      keywords,
    })
    await recipe.save()
    res.json(recipe)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

router.put('/', validators, auth, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id, title, description, preparation, keywords } = req.body
  if (!id) {
    return res.status(400).json({ message: 'Id is required' })
  }

  try {
    const recipe = await Recipe.findById({ _id: id, user: req.user.id })
    if (!recipe) {
      return res.status(404).json({ message: 'Record not found' })
    }

    recipe.title = title
    recipe.description = description
    recipe.preparation = preparation
    recipe.keywords = keywords
    await recipe.save()

    res.json(recipe)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Recipe.findOneAndRemove({
      user: req.user.id,
      _id: req.params.id,
    })

    res.json({ message: 'api.message.deleted:' + result })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
