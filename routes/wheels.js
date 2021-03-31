const express = require('express');
const router = express.Router();
const Wheels = require('../models/wheels');

//Get all Wheels
router.get('/', (req, res) => {
    Wheels.find().then(
        (wheels) => {
            res.status(200).json(wheels);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Get One Wheel
router.get('/:id', getWheels, (req, res) => {
    res.json(res.wheels);
});

//Create Wheel
router.post('/', (req, res) => {
    const wheels = new Wheels({
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        width: req.body.width,
        rim_diameter: req.body.rim_diameter,
        main_img: req.body.main_img,
        front_img: req.body.front_img,
        back_img: req.body.back_img
    });
    wheels.save().then(
        () => {
            res.status(201).json({
                message: 'New Wheel Added Successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Update Wheel
router.patch('/:id', getWheels, async (req, res) => {
    if(req.body.brand != null){res.wheels.brand = req.body.name;}
    if(req.body.model != null){res.wheels.model = req.body.model;}
    if(req.body.price != null){res.wheels.price = req.body.price;}
    if(req.body.width != null){res.wheels.width = req.body.width;}
    if(req.body.rim_diameter != null){res.wheels.rim_diameter = req.body.rim_diameter;}
    if(req.body.main_img != null){res.wheels.main_img = req.body.main_img;}
    if(req.body.front_img != null){res.wheels.front_img = req.body.front_img;}
    if(req.body.back_img != null){res.wheels.back_img = req.body.back_img;}
    try{
        const updatedWheel = await res.wheels.save();
        res.json(updatedWheel);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Delete Wheel
router.delete('/:id', getWheels, async (req, res) => {
    try{
        await res.wheels.remove();
        res.json({
            message: 'Wheel Deleted Successfully!'
        });
    }catch(error){
        res.status(500).json({
            error: error
        });
    }
});

//Async function to find element by id
async function getWheels(req, res, next){
    let wheels;
    try{
        wheels = await Wheels.findById(req.params.id);
        if(wheels == null){
            return res.status(404).json({
                message: "Cannot find Wheel"
            });
        }
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
    res.wheels = wheels;
    next();
}

module.exports = router;