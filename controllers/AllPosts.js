const User=require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports={
    allPosts: function  (req,res){
    jwt.verify(req.token,process.env.SECRET_KEY,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            User.find().exec().then(doc =>
            {
                console.log(doc)
                res.status(200).json(doc)
            })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({
                        Error : err
                    })})
        }
    })

}
}