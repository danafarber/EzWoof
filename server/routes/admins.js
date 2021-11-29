const express = require('express');
const router = express.Router();
const Admin = require('../models/admins.js')

// get all admins
router.get('/', async (req,res) => {
    try {
        const admins = await Admin.find();
        res.json(admins)
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

// get one admin
router.get('/:id', getAdmin, (req,res) => {
    res.json(res.admin)
})

// create admin
router.post('/', async (req,res) => {
    const admin = new Admin ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const newAdmin = await admin.save()
        res.status(201).json(newAdmin)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
});

// delete admin
router.delete('/:id', getAdmin, async (req,res) => {
    try {
        await res.admin.remove()
        res.json({message: 'Admin Deleted'})
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

// update admin
router.patch('/:id', getAdmin, async (req,res) => {
    if (req.body.first_name != null) {
        res.admin.first_name = req.body.first_name
    }

    if (req.body.last_name != null) {
        res.admin.last_name = req.body.last_name
    }

    if (req.body.email != null) {
        res.admin.email = req.body.email
    }

    if (req.body.password != null) {
        res.admin.password = req.body.password
    }

    try {
        const updatedAdmin = await res.admin.save()
        res.json(updatedAdmin)
    }

    catch(err) {
        res.status(400).json({message: err.message})
    }
});


// middlefunction
async function getAdmin(req,res,next) {
    let admin

    try {
        admin = await Admin.findById(req.params.id)
        if (admin == null) {
            return res.status(404).json({message: 'Cannot find admin'});
        }
    } 
    catch(err) {
        return res.status(500).json({message: err.message});
    }

    res.admin = admin
    next()
}


module.exports = router;
