const mongoose = require('mongoose');
const { format } = require('path');
const Schema = mongoose.Schema;

const PostModel = new Schema({
    tweet:{
        type:String,
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },

    imageUrl:{ 
        type:String,
    },

    likeCount:{
        type:Number,
        default:0,
    },

    likedBy:[{
        type:Schema.Types.ObjectId,
        ref: "user"
    }],

    hashtags:[{
        type:String,
    }],

    date:{
        type:String,
        
    },
},

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("post", PostModel);