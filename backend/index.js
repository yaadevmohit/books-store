import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoute.js";
import cors from 'cors';


dotenv.config();

const app = express();

// all the middlewares
//parsing request body
app.use(express.json());

//cors policy
app.use(cors());

// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

// routes
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