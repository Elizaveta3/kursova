import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation }from './validations/auth.js';
import AccountModel from './models/Account.js';

mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const doc = new AccountModel({
        email: req.body.email,
        passwordHash: req.body.password,
        userName: req.body.userName,
    });
    res.json({
        success: true,
    });
});

app.listen(8083, (err) => {
    if(err){
        return console.log(err);
    }

    console.log("Server Ok");
});

