const asyncWrapper = require('../middleware/async-wrapper')
const {logIn,signIn,createBlog} = require('../model/dbmodel')

const createLogin = asyncWrapper(async(req,res)=>{
    console.log("Triggered Login cred",req.body);
    const bloginCheck = await signIn.findOne({username:req.body.username,password:req.body.password})
    if(bloginCheck){
        //const blogin = await logIn.create(req.body)
        res.status(201).json({data:bloginCheck})
    }else{
        res.status(500).json({msg:"Username not exist"})
    }
})
const createSignin = asyncWrapper(async(req,res)=>{
    console.log("Triggred Signin cred",req.body);
    const bsigninCheck = await signIn.findOne({username:req.body.username})
    if(!bsigninCheck){
        const bsignin = await signIn.create(req.body)
        res.status(201).json({data:bsignin})
    }else{
        res.status(500).json({msg:"Username already In use"})
    }
    
})
const createBlogPost = asyncWrapper(async(req,res)=>{
    console.log("Triggerd Create Blog Post",req.body);
    const createblogPost = await createBlog.create(req.body);
    res.status(201).json({data:createblogPost})
})
const getMyPost = asyncWrapper(async(req,res)=>{
    console.log("Triggerd My Post",req.body,req.params['user']);
    const {user} = req.params
    console.log(user);
    const myPost = await createBlog.find({'username':user})
    res.status(201).json({myPost})
})
const getAllPost = asyncWrapper(async(req,res)=>{
    console.log("Triggerd All Post",req.body)
    const allPost = await createBlog.find({})
    res.status(201).json({allPost})
})
module.exports = {createLogin,createSignin,createBlogPost,getMyPost,getAllPost}