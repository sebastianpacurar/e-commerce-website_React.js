const express = require('express');
const router = express.Router();
const Product = require('../models/products');


// the GET for the entire products collection
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (err) {
        res.json({message: err});
    }
})


module.exports = router;