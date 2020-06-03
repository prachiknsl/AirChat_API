const express = require('express')
const {registration}=require('../controllers/Registration')
const {login}=require('../controllers/Login')
const {allPosts}=require('../controllers/AllPosts')
const {verifyToken}=require('../middlewares/middleware')
const airchat = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
airchat.use(cors())

process.env.SECRET_KEY = 'secret'

airchat.post('/register',registration)
airchat.post('/login', login)

airchat.get('/allPosts',verifyToken,allPosts)
//
//
// airchat.get('/profile', (req, res) => {
//     var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
//
//     User.findOne({
//         _id: decoded._id
//     })
//         .then(user => {
//             if (user) {
//                 res.json(user)
//             } else {
//                 res.send('User does not exist')
//             }
//         })
//         .catch(err => {
//             res.send('error: ' + err)
//         })
// })
airchat.post('/createPosts',verifyToken,(req,res)=>{
    jwt.verify(req.token,process.env.SECRET_KEY,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post Created',
                authData
            })
        }
    })
    // res.json({
    //     message: 'post created....'
    // });
});
module.exports = airchat