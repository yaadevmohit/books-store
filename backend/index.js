import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoute.js";


dotenv.config();

const app = express();

// middleware for parsing request body
app.use(express.json());

app.use('/books', booksRoute)

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