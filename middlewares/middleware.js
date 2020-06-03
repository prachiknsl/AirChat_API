const User=require('../models/User');
const bcrypt = require('bcrypt')
module.exports={
    verifyToken: function (req,res,next) {
        const bearerHeader=req.headers['authorization'];
        if(typeof bearerHeader !=='undefined'){
            const bearer=bearerHeader.split(' ');
            const bearerToken=bearer[1];
            //console.log(bearer[1]);
            req.token=bearerToken;
            next();
        }
        else {
            // Forbidden
            console.log('verify error');
            // res.sendStatus(403);
            res.json({
                status:403,
                message:"Please login to your account"
            });
        }
    }
}