const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//All Authors Route
router.get('/', async (req, res) =>{  
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {authors: authors, searchOptions: req.query})
    }catch{
        res.redirect('/')

    }
});

//New Author Route  --this is for displaying the form
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() }) //new Author() doesn't actually save anything in the database but does create an author which can be used to saved, delete and update things inside database. gives object that we can use in our ejs file  
});

//Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router 