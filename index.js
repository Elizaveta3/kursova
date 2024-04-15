// Відео 56 хвилина рядок 43-50

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation }from './validations/auth.js';
import AccountModel from './models/Account.js';

mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/app')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req,res) => {
    try {

        const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
     
    //Шифрування паролю

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new AccountModel({
        email: req.body.email,
        passwordHash,
        userName: req.body.userName,
    });

    const account = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    },
     'secret123',
     {
        expiresIn: '30d',
     }
    )

    res.json(account);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося зареєструватися',
        })
    }
});

app.listen(8083, (err) => {
    if(err){
        return console.log(err);
    }

    console.log("Server Ok");
});

