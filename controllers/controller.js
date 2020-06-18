const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const secret = "mysecret";
const bcrypt = require('bcrypt')

const User = mongoose.model('User');
module.exports = {
    create: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(userFromDB => {
                console.log(userFromDB)
                if (userFromDB !== null) {
                    res.json({ msg: "Email already exists", flag: false })
                } else {
                    const temp = new User(req.body);
                    temp.save()
                        .then(response => {
                            console.log(response)
                            const newJWT = jwt.sign({ _id: response._id }, secret)
                            res.cookie("usertoken", newJWT, {
                                httpOnly: true
                            }).json({ msg: "success", _id: response._id });
                        })
                        .catch(error2 => res.json(error2))
                }
            })
            .catch(error => res.json(error))
    },
    readAll: (req, res) => {
        User.find()
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    readOne: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    updateOne: (req, res) => {
        User.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    updateProfile: (req, res) => {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                req.body.password = hash
                User.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
                    .then(userFromDB => res.json(userFromDB))
                    .catch(error => res.json(error))
            })
            .catch(error2 => res.json(error2))
    },
    deleteOne: (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(response => res.json(response))
            .catch(error => res.json(error))
    },
    login: (req, res) => {
        console.log(req.body);
        User.findOne({ email: req.body.email })
            .then(userFromDB => {
                if (userFromDB === null) {
                    res.json({ msg: "User not found in Database" });
                } else {
                    bcrypt.compare(req.body.password, userFromDB.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                const newJWT = jwt.sign({ _id: userFromDB._id }, secret)
                                res.cookie("usertoken", newJWT, {
                                    httpOnly: true
                                }).json({ msg: "success", _id: userFromDB._id });
                                // used successs to differentiate between msg/bad and success/good
                            } else {
                                res.json({ msg: "password is not correct" });
                            }
                        })
                        .catch(error => res.json({ msg: "Bcrypt compare has failed here" }));
                }
            })
            .catch(error => {
                console.log(error)
                res.json({ msg: "DB has failed to run the query", error })
            })
    },
    logout: (req, res) => {
        console.log('got here')
        res.clearCookie('usertoken').json({ msg: 'logged out' })
    },
    authenticate: (req, res, next) => {
        jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
            console.log(payload);
            if (err) {
                res.status(401).json({ verified: false });
            } else {
                next();
            }
        })
    }
}