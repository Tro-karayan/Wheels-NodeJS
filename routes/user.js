const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//Get All Users
router.get('/', (req, res) => {
    User.find().then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
})

//Get One User
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
});

//Create new user
router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'New User Added Successfully'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
});

//Update User
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.username != null){res.user.username = req.body.username;}
    if(req.body.email != null){res.user.email = req.body.email;}
    if(req.body.phone != null){res.user.phone = req.body.phone;}
    if(req.body.password != null){res.user.password = await bcrypt.hash(req.body.password, 10);}
    try{
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Delete User
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove();
        res.json({
            message: 'User Deleted Successfully!'
        });
    }catch(error){
        res.status(500).json({
            error: error
        });
    }
});

//Async function to find element by id
async function getUser(req, res, next){
    let user;
    try{
        user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({
                message: "Cannot find User"
            });
        }
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
    res.user = user;
    next();
}

module.exports = router;