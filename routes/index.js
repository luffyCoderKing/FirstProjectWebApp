const express = require('express');
const router = express.Router();
const Book = require('../models/book')

router.get('/', async (req, res) =>{  // the '/' means the root directory or the localhost:3000 
    let books
    try{
        books = await Book.find().sort({ createAt: 'desc'}).limit(10).exec()
    }catch{
        books = [];
    }
    res.render('index', {books: books})
});

module.exports = router //to export the information in this file