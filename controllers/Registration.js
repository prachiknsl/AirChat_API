const User=require('../models/User');
const bcrypt = require('bcrypt')
module.exports={
    registration: function   (req, res) {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + '   Registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    }
    // registerRecipe: function (req,res) {
    //     const inputData=req.body;
    //     recipeService(inputData,(err,results)=>
    //     {
    //         if(err)
    //             console.log(err);
    //         res.json({
    //             status:true,
    //             message:results
    //         });
    //     });
    // }

}