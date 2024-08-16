const PostModel = require("../model/PostModel");
const encrypt = require("../utils/encrypt");
const TokenUtils = require("../utils/TokenUtils")
const multer =require("multer");
const path = require("path");
const CloudinaryUtils = require('../utils/CloudinaryUtils');
const CommentModel = require("../model/CommentModel");
const { error } = require("console");
// const { message } = require("statuses");
// const { error } = require("console");



const storage = multer.diskStorage({
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
});

const upload =multer({
    storage:storage,
    limits:{fileSize:1000000},
}).single("imageUrl");



const createpost = async (req, res) => {


    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({

                mess: "error uploading file",
                err: err
            })
        } else {
            

            console.log(req.file.path)
            const result = await CloudinaryUtils.uploadFile(req.file.path)
            console.log(result)
            const hashedpassword = await encrypt.encryptPassword(req.body.password);
            try {

                const userobj = {
                    tweet:req.body.tweet,
                    userId: req.body.userId,
                    imageUrl:req.body.imageUrl,
                    hashtags:req.body.hashtags,
                    // likeCount:req.body.likeCount,
                    // likedBy:req.body.likedBy,
                }
                const user = await PostModel.create(userobj);
                res.status(201).json({
                    data: user
                })
            } catch (err) {

                res.status(400).json({
                    mess: "failed user....",
                    error: err,
                })
            }
        }
    })

}

const likedByuser = async(req,res)=>{
    
    const userId = req.body.userId;
    const tweet = req.params.tweet;

  try {

    const tweetLike = await PostModel.findById(tweet);

    if (tweetLike != null) {

      if (tweetLike.likedBy.includes(userId)) {

        res.status(400).json({
          message: "already liked",
        });

      } else {

        const updated = await PostModel.findByIdAndUpdate(
          tweet,
          { $push: { likedBy: userId },
           $inc: { likeCount: 1 } }
        );

        res.status(201).json({
          message: " tweet liked!!",
          data: updated,

        });
      }

    } else {
      res.status(404).json({
        message: "not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Like Failed",
      error: err,
    });
  }
}

const createComment = async(req,res)=>{
       try{
          const commentobj ={
            comment : req.body.comment,
            user: req.body.user,
            post : req.body.post,
          }

          const comment = await CommentModel.create(commentobj);
          res.status(200).json({
            message: "commented successfully!!",
          })
       }catch(err){
          res.status(404).json({
            message:"comment failed",
            error:err,
          });
       } 
}

const getComment = async(req,res)=>{

    const user = req.query.user;
    const post = req.query.post;
    const comment = await CommentModel.find({user:user, post:post});
    res.status(401).json({
      message:"comment get",
      data : comment
    })
    
}

const getPostByDate = async(req,res)=>{

    const date = req.query.date;
    const post =req.query.post;
    const postDate = await PostModel.Date.toLocaleDateString({post:post,date:date});
    res.json(401).json({
      message: "get date",
      data: postDate,
    })
}
module.exports ={
    createpost,
    likedByuser,
    createComment,
    getComment,
    getPostByDate, 
}