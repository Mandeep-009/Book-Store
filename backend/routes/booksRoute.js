import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post('/', async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);
        res.status(201).send(book);
    } catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.get('/', async (req,res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).send(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

router.put('/:id', async (req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send('fill all fields: title, author, publishYear');
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);
        if(!result) {
            return res.status(404).send('aisa to koi element mila hi nahi');
        }
        res.status(200).send('book updated successfully');
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send('na mila na delete hua');
        }
        res.status(200).send('deleted successfully');
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;