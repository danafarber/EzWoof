const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const mongoose = require('mongoose')

// get all users
router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        .populate('city')
        .populate('expert')
        .populate('dogRace')
        .exec((err, trainers) => {
          res.status(200).json(trainers);
        });
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
        dogRace:mongoose.Types.ObjectId(req.body.dogRace),
        expert:[mongoose.Types.ObjectId(req.body.expert)],
        city: mongoose.Types.ObjectId(req.body.city),
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
        res.user.pet_name = req.body.pet_name
    }

    if (req.body.email != null) {
        res.user.email = req.body.email
    }

    if (req.body.password != null) {
        res.user.password = req.body.password
    }

    if (req.body.dogRace != null) {
        res.user.dogRace = mongoose.Types.ObjectId(req.body.dogRace)
    }

    if (req.body.expert != null) {
        res.user.expert = [mongoose.Types.ObjectId(req.body.expert)]
    }

    if (req.body.city != null) {
        res.user.city = mongoose.Types.ObjectId(req.body.city)
    }

    if (req.body.photo != null) {
        res.user.photo = req.body.photo
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

        .populate('city')
        .populate('expert')
        .populate('dogRace')
        .exec();
        
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