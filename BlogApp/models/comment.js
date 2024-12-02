const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true, 
    },
    user: {
        type:String,
        required:true
    },
    body: {
        type: String,
        required: true, 
    },
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
