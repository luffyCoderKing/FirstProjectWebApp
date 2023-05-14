const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{  // the '/' means the root directory or the localhost:3000 
    res.render('index')
});

module.exports = router //to export the information in this file