const express = require('express');
const router = express.Router();
const DogRace = require('../models/dogRaces.js')

// get all breeds
router.get('/', async (req,res) => {
    try {
        const breeds = await DogRace.find();
        res.json(breeds)
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

// get one breed
router.get('/:id', getBreed, (req,res) => {
    res.json(res.breed)
})

// create breed
router.post('/', async (req,res) => {
    const breed = new DogRace ({
        name: req.body.name,
    })

    try {
        const newBreed = await breed.save()
        res.status(201).json(newBreed)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
});

// delete breed
router.delete('/:id', getBreed, async (req,res) => {
    try {
        await res.breed.remove()
        res.json({message: 'Breed Deleted'})
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})


// middlefunction
async function getBreed(req,res,next) {
    let breed

    try {
        breed = await DogRace.findById(req.params.id)
        if (breed == null) {
            return res.status(404).json({message: 'Cannot find breed'});
        }
    } 
    catch(err) {
        return res.status(500).json({message: err.message});
    }

    res.breed = breed
    next()
}


module.exports = router;
