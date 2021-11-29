const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const mongoose = require('mongoose')

// get all users
router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

// get one user
router.get('/:id', getUser, (req,res) => {
    res.json(res.user)
})

// create user
router.post('/', async (req,res) => {
    const user = new User ({
        name: req.body.name,
        pet_name:req.body.pet_name,
        email:req.body.email,
        password:req.body.password,
        dogRaces:mongoose.Types.ObjectId(req.body.dogRaces),
        expert:[mongoose.Types.ObjectId(req.body.expert)],
        location: mongoose.Types.ObjectId(req.body.location),
        photo:req.body.photo
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
});

// delete user
router.delete('/:id', getUser, async (req,res) => {
    try {
        await res.user.remove()
        res.json({message: 'User Deleted'})
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

// update user
router.patch('/:id', getUser, async (req,res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    } 

    if (req.body.pet_name != null) {
        req.user.pet_name = req.body.pet_name
    }

    if (req.body.email != null) {
        req.user.email = req.body.email
    }

    if (req.body.password != null) {
        req.user.password = req.body.password
    }

    if (req.body.dogRaces != null) {
        req.user.dogRaces = mongoose.Types.ObjectId(req.body.dogRaces)
    }

    if (req.body.expert != null) {
        req.user.expert = [mongoose.Types.ObjectId(req.body.expert)]
    }

    if (req.body.location != null) {
        req.user.location = mongoose.Types.ObjectId(req.body.location)
    }

    if (req.body.photos != null) {
        req.user.photos = req.body.photos
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }

    catch(err) {
        res.status(400).json({message: err.message})
    }
});

// middlefunction
async function getUser(req,res,next) {
    let user

    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'Cannot find user'});
        }
    } 
    catch(err) {
        return res.status(500).json({message: err.message});
    }

    res.user = user
    next()
}

module.exports = router;