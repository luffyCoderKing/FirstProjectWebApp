const mongoose = require('mongoose');
const Book = require('./book')  // './' means current directory

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


authorSchema.pre('remove', function(next){
    Book.find({author: this.id}, (err, books) => {
        if(err){
            next(err)
        }else if(books.length > 0){
            next(new Error('This author has books still'))
        }else{
            next()
        }
    })
})


/*
//working but will delete even the author/s that has book/s
authorSchema.pre('deleteOne', async function(next){
    try{
        const query = this.getFilter();
        const hasBook = await Book.exists({ author: query._id });
  
        if (hasBook) {
            next(new Error("This author still has books."));
        } else {
            next();
        }
    }catch (err) {
        next(err);
    }
})
*/


module.exports = mongoose.model('Author', authorSchema);