const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Array,
        required: true
    },
    comments: {
        type: Array,
        required: true
    }
})

const News = mongoose.model('News', NewsSchema);

module.exports = News;