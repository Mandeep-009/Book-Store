import express from "express";
import { PORT , mongodbURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello, welcome to mern project tutorial")
})

app.use('/books',booksRoute);

mongoose
    .connect(mongodbURL)
    .then(()=>{
        console.log('server connected to the database');
        app.listen(PORT,()=>{
            console.log(`server is listening on port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });