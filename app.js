const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))//middleware


const userRoutes = require("./src/routes/UserRoutes");
const PostRoutes = require("./src/routes/PostRoutes");

app.use("/users",userRoutes);
app.use("/post",PostRoutes);
app.use("/comment",PostRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/node_backup").then(()=>{
    console.log("Connected to database...")
}).catch((err)=>{
    console.log("Error connecting to database...",err)
});

const PORT = 3030;
app.listen(PORT,()=>{
    console.log('server is running on port '+ PORT);
})











