const express = require('express');
const router = express.Router();
const City = require('../models/cities.js')

// get all cities
router.get('/', async (req,res) => {
    try {
        const cities = await City.find();
        res.json(cities)
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

// get one city
router.get('/:id', getCity, (req,res) => {
    res.json(res.city)
})

// create city
router.post('/', async (req,res) => {
    const city = new City ({
        name: req.body.name,
        english_name: req.body.english_name,
        long:req.body.long,
        latt:req.body.latt
    })

    try {
        const newCity = await city.save()
        res.status(201).json(newCity)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
});

// delete city
router.delete('/:id', getCity, async (req,res) => {
    try {
        await res.city.remove()
        res.json({message: 'City Deleted'})
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})


// middlefunction
async function getCity(req,res,next) {
    let city

    try {
        city = await City.findById(req.params.id)
        if (city == null) {
            return res.status(404).json({message: 'Cannot find city'});
        }
    } 
    catch(err) {
        return res.status(500).json({message: err.message});
    }

    res.city = city
    next()
}


module.exports = router;
