const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    avatar: String
}, {
    timestamps: true
});


module.exports = mongoose.model('profiles', ProfileSchema);