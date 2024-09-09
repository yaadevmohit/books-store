import express from 'express';
import {Book} from "../models/bookModel.js"
import mongoose from 'mongoose';

const router = express.Router();

// Middleware to validate ObjectId
function validateObjectId(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({message: "Book not found"})
    }
    next();
}

// Middleware to check all required fields
function validateInputFields(req, res, next) {
    if(
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
    ) {
        return res.status(400).json({message: "bro some info is missing"})
    }
    next();
}


// Route to save a new book
router.post('/', validateInputFields, async (req, res) => {
    try {
        const {title, author, publishYear} = req.body;
        const book = await Book.create({title, author, publishYear});
        return res.status(201).json(book)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}
)

// router to get all books
router.get('/', async (req, res) => {
    try {
        const allBooks = await Book.find({});
        res.status(200).json({length: allBooks.length, data:allBooks})
    } catch(err) {
        res.status(500).send(err.message)
    }
})

// router to get a book by id 
router.get('/:id', validateObjectId, async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        return res.status(200).send(book)
    } catch(err) {
        return res.status(500).send(err.message)
    }
})

// router to update a book
router.put('/:id', validateInputFields, validateObjectId, async (req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body)
        res.status(200).json({message: "Book Updated successfully"})
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

// router to delete a book
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        return res.status(200).send({message: "book deleted successfully"})
    } catch(err) {
        return res.status(500).send({message: err.message})
    }
})

export default router