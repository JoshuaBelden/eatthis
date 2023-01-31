const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    biography: {
        type: String
    },
    birthday: {
        type: Date
    },
    company: {
        type: String
    },
    github: {
        type: String
    },
    location: {
        type: String
    },
    profileimage: {
        type: String
    },
    website: {
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        youtube: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);