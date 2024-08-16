const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModel =new Schema({

    comment:{
        type:String,
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },

    post:{
        type:Schema.Types.ObjectId,
        ref:"post",
    }

},
    {
        timestamps: true,
    }
);





module.exports = mongoose.model("comment", CommentModel);