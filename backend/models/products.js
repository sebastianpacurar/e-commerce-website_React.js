const mongoose = require('mongoose');

// the MongoDB schema used for the products
const ProductsSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    item: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true
    },

    details: {
        type: Object,
        required: true
    }
});


module.exports = mongoose.model('Products', ProductsSchema);