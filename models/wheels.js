const mongoose = require('mongoose');

const wheelsSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: String, required: true},
    width: {type: String, required: true},
    rim_diameter: {type: String, required: true},
    main_img: {type: String, required: true},
    front_img: {type: String, required: true},
    back_img: {type: String, required: true},
});

module.exports = mongoose.model('Wheels', wheelsSchema);