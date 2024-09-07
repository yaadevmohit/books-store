import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

dotenv.config();

const app = express();

// middleware for parsing request body
app.use(express.json());

// get request home
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome To this baller club bro')
});

app.post('/books', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

// getting all books
app.get('/books', async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).json({count: books.length, data: books});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// getting books by id
app.get('/books/:id', async (req, res) => {
    try{
        const {id} = req.params
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})



// getting books by author
app.get('/books/:author', async (req, res) => {
    try{
        const {author} = req.params
        const book = await Book.find({author});
        res.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// updating a book
app.put('/books/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body)
        if(!book) {
            return res.status(404).json({message: "book not found"})
        }
        res.status(200).json({message: "book updated successfully"})
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// deleting a book
app.delete('/books/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return res.status(404).send({message: 'book not found'})
        }
        return res.status(200).send({message: "Book deleted successfully"});
    }   catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})


// connecting to the db and starting the app
mongoose
.connect(process.env.DB_URL)
.then(() => {
    console.log('App connected to database')
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on port: ${process.env.PORT}`)
    })
})
.catch(error => {
    console.log(error)
})