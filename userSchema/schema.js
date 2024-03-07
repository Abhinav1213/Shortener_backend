const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    analytics: [
        {
            full: {
                type: String,
                required: true
            },
            shortId: {
                type: String
            },
            clicks: {
                type: Number,
                default: 0
            }
        }
    ]
});
    
module.exports = mongoose.model('User', userSchema);