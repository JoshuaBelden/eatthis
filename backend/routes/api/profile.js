const express = require('express')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const request = require('request')
const config = require('config')

const router = express.Router()

// ROUTES

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ])

    if (!profile) {
      return res.status(404).json({ message: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   POST api/profile
// @desc    Create or update a user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  const {
    biography,
    birthday,
    company,
    facebook,
    github,
    instagram,
    linkedin,
    location,
    profileimage,
    twitter,
    website,
    youtube,
  } = req.body

  const profileFields = {}

  profileFields.user = req.user.id
  profileFields.social = {}

  if (biography) profileFields.biography = biography
  if (birthday) profileFields.birthday = birthday
  if (company) profileFields.company = company
  if (github) profileFields.github = github
  if (location) profileFields.location = location
  if (profileimage) profileFields.profileimage = profileimage
  if (website) profileFields.website = website
  if (facebook) profileFields.social.facebook = facebook
  if (instagram) profileFields.social.instagram = instagram
  if (linkedin) profileFields.social.linkedin = linkedin
  if (twitter) profileFields.social.twitter = twitter
  if (youtube) profileFields.social.youtube = youtube

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )

      return res.json(profile)
    }

    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   GET api/profile
// @desc    Gets all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

// @route   GET api/profile/user/:user_id
// @desc    Gets profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'name',
      'avatar',
    ])
    if (!profile) {
      return res.status(400).json({ message: 'Profile not found' })
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ message: 'Profile not found' })
    }
    res.status(500).send('Server error')
  }
})

// @route   DELETE api/profile
// @desc    Deletes a profile and user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ message: 'User deleted' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
