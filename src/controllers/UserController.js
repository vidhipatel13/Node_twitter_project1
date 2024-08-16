const UserSchema = require("../model/UserModel");
const encrypt = require("../utils/encrypt");
const TokenUtils = require("../utils/TokenUtils")
const multer =require("multer");
const path = require("path");
const cloudanryupload = require('../utils/CloudinaryUtils');


const getAlluser = async (req,res)=>{
    const user =await UserSchema.find();
    res.json({
        mess: "user data fetched",
        data:user
    })  
}


const storage = multer.diskStorage({
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
});

const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},
    // fileFilter:function( file, cb){
    //     const fileTypes = /jpeg|jpg/
    //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    //     const mimetype = fileTypes.test(file.mimetype)
    //     if(extname && mimetype){
    //         return cb(null,true)
    //     }
    //     else{
    //         cb("Error: Images only!")
    //     }
    // }

}).single("profilePic");

const adduser = async (req, res) => {


    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({
                mess: "error uploading file",
                err: err
            })
        } else {
            // cloundinary upload
            console.log(req.file.path)
            const result = await cloudanryupload.uploadFile(req.file.path)
            console.log(result)
            const hashedpassword = await encrypt.encryptPassword(req.body.password);
            try {
                const userobj = {
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                age: req.body.age,
                                email: req.body.email,
                                profilePic: result.secure_url,
                    password: hashedpassword
                }
                const user = await UserSchema.create(userobj);
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

const loginuser = async (req, res) => {
    const useremail = req.body.email;
    const userpassword = req.body.password;

    const userFromemail = await UserSchema.findOne({ email: useremail });
    if (userFromemail) {
        const isMatch = await encrypt.comparePassword(
            userpassword,
            userFromemail.password
        );
        if (isMatch) {
            const token = TokenUtils.generateToken(userFromemail.toObject());
            res.status(400).json({
                mess: "user login in",
                token: token,
            })
        } else {
            res.status(400).json({
                mess: "invaild password",
            })
        }
    } else {
        res.status(400).json({
            mess: "user not found"
        })
    }

}
module.exports = {
    getAlluser,
    adduser,
    loginuser
} 