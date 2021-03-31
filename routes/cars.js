const express = require('express');
const router = express.Router();
const Cars = require('../models/cars');

//Get all Cars
router.get('/', (req, res) => {
    Cars.find().then(
        (cars) => {
            res.status(200).json(cars);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Get One Car
router.get('/:id', getCars, (req, res) => {
    res.json(res.cars);
});

//Create Car
router.post('/', (req, res) => {
    const cars = new Cars({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year
    });
    cars.save().then(
        () => {
            res.status(201).json({
                message: 'New Car Added Successfully!'
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

//Update Car
router.patch('/:id', getCars, async (req, res) => {
    if(req.body.make != null){res.cars.brand = req.body.make;}
    if(req.body.model != null){res.cars.model = req.body.model;}
    if(req.body.year != null){res.cars.year = req.body.year;}
    try{
        const updatedCar = await res.cars.save();
        res.json(updatedCar);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Delete Car
router.delete('/:id', getCars, async (req, res) => {
    try{
        await res.cars.remove();
        res.json({
            message: 'Car Deleted Successfully!'
        });
    }catch(error){
        res.status(500).json({
            error: error
        });
    }
});

//Async function to find element by id
async function getCars(req, res, next){
    let cars;
    try{
        cars = await Cars.findById(req.params.id);
        if(cars == null){
            return res.status(404).json({
                message: "Cannot find Car"
            });
        }
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
    res.cars = cars;
    next();
}


module.exports = router;