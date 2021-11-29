const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainers.js')
const mongoose = require('mongoose')

// get all trainers
router.get('/', async (req,res) => {
    try {
        const trainers = await Trainer.find();
        res.json(trainers)
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

// Get one trainer
router.get('/:id', getTrainer, (req,res) => {
    res.json(res.trainer)
})

// Create trainer
router.post('/', async (req,res) => {
    const trainer = new Trainer ({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        dogRaces: mongoose.Types.ObjectId(req.body.dogRaces),
        experience:req.body.experience,
        expert:mongoose.Types.ObjectId(req.body.expert),
        location:mongoose.Types.ObjectId(req.body.city),
        tip:req.body.tip,
        photos:req.body.photos,
        pricing:req.body.pricing
    })

    try {
        const newTrainer = await trainer.save()
        res.status(201).json(newTrainer)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
})

// middlefunction
async function getTrainer(req,res,next) {
    let trainer

    try {
        trainer = await Trainer.findById(req.params.id)
        if (trainer == null) {
            return res.status(404).json({message: 'Cannot find trainer'});
        }
    } 
    catch(err) {
        return res.status(500).json({message: err.message});
    }

    res.trainer = trainer
    next()
}

module.exports = router;
