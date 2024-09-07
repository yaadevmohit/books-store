import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

dotenv.config();

const app = express();

// middleware for parsing request body
app.use(express.json());


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

app.get('/books', async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).json({count: books.length, data: books});
    } catch(error) {
        console.log(error.message);
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