if(process.env.NODE_ENV !== 'production'){   //we don't want this to load in production, unless we are in development environment
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');  //importing this router into the server since it doesn't know it exist yet
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');    //every single layout file is going to be put inside this layout file, in order not to duplicate all the beginning and ending html such as the header and footer
app.use(expressLayouts); //to use expressLayouts
app.use(express.static('public'));   //to tell where our public files will be, such as css file, javascript, images
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewURLParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to Mongoose'))   //this will run only once

app.use('/', indexRouter);
app.use('/authors', authorRouter);  //the routes should look like this 'authors/new' 
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000);    //3000 is for local server since env.PORT doesn't return anything since we didn't declared anything in the env