const User=require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
process.env.SECRET_KEY = 'secret'
module.exports={
    login: function(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        // Passwords match
                        const payload = {
                            _id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email
                        }
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.send(token)
                    } else {
                        // Passwords don't match
                        res.json({error: 'Wrong Password'})
                    }
                } else {
                    res.json({error: 'User does not exist'})
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }

}