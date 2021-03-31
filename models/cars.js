const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: String, required: true}
});

module.exports = mongoose.model('Cars', carsSchema);