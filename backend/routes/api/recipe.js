const express = require('express')
const auth = require('../../middleware/auth')
const Recipe = require('../../models/Recipe')
const { check, validationResult } = require('express-validator')

const router = express.Router()

// router.get('/', async (req, res) => {
//     try {
//         const profiles = await Profile.find().populate('user', ['name', 'avatar']);
//         res.json(profiles);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

const validators = [
  check('title', 'validation.recipe.title.required').exists(),
  check('description', 'validation.recipe.description.required').exists(),
  check('preparation', 'validation.recipe.preparation.required').exists(),
]

router.post('/', validators, auth, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { title, description, preparation, keywords } = req.body

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

// router.delete('/', auth, async (req, res) => {
//     try {
//         await Profile.findOneAndRemove({ user: req.user.id });
//         await User.findOneAndRemove({ _id: req.user.id });

//         res.json({ message: 'User deleted' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router
