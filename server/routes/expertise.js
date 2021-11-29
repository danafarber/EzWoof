const express = require('express');
const router = express.Router();
const Expert = require('../models/experts.js')

// get all expertise
router.get('/', async (req,res) => {
    try {
        const expertise = await Expert.find();
        res.json(expertise)
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

// get one expertise
router.get('/:id', getExpertise, (req,res) => {
    res.json(res.expertise)
})

// create breed
router.post('/', async (req,res) => {
    const expertise = new Expert ({
        name: req.body.name,
    })

    try {
        const newExpertise = await expertise.save()
        res.status(201).json(newExpertise)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
});

// delete breed
router.delete('/:id', getExpertise, async (req,res) => {
    try {
        await res.expertise.remove()
        res.json({message: 'Expertise Deleted'})
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})


// middlefunction
async function getExpertise(req,res,next) {
    let expertise

    try {
        expertise = await Expert.findById(req.params.id)
        if (expertise == null) {
            return res.status(404).json({message: 'Cannot find expertise'});
        }
    } 
    catch(err) {
        return res.status(500).json({message: err.message});
    }

    res.expertise = expertise
    next()
}


module.exports = router;
