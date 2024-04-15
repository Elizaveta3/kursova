import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', (req,res) => {
    
});

app.listen(8083, (err) => {
    if(err){
        return console.log(err);
    }

    console.log("Server Ok");
});

