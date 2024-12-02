const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true, 
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    }],
}, { timestamps: true });

const Post = mongoose.model('post', postSchema);
module.exports = Post;
