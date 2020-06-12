const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// keys
const keys = require('../config/keys');


// signup input validation && login input validation
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');



exports.postSignup = (req, res) => {
    const { username, fullname, email, password } = req.body;
    const { errors, isValid } = validateSignupInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        User.findOne({ 'username': username })
            .then(isUser => {
                if (isUser) {
                    errors.username = 'username already exists';
                    return res.status(400).json(errors);
                }
                User.findOne({ 'email': email })
                    .then(isEmail => {
                        if (isEmail) {
                            errors.email = 'email is already registered';
                            return res.status(400).json(errors);
                        }
                        return bcrypt.hash(password, 12);
                    })
                    .then(hashedPassword => {
                        const user = new User({
                            username,
                            fullname,
                            email,
                            password: hashedPassword
                        });
                        return user.save();
                    })
                    .then(newuser => {
                        res.json(newuser);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
}


exports.postLoginUser = (req, res) => {
    const { username, password } = req.body;
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        User.findOne({ 'username': username })
            .then(user => {
                if (!user) {
                    errors.username = 'user has not been registered';
                    return res.status(404).json(errors);
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.password = 'incorrect password';
                            return res.status(400).json(errors);
                        } else {
                            // user jwt payload
                            const payload = {
                                id: user._id,
                                username: user.username,
                                name: user.fullname
                            }
                            // check to make token last forever unless logout
                            jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
                                res.json({ token: 'Bearer ' + token });
                            });
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
}
