import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome To MERN Stack Tutorial')
});

app.listen(process.env.PORT, () => {
    console.log(`App is listening on port: ${process.env.PORT}`)
})