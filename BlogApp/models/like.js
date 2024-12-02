const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true, // added 'required' to ensure it's provided
    },
    user: {
        type:String,
        required:true
    },
}, { timestamps: true });

const Like = mongoose.model('like', likeSchema);
module.exports = Like;
