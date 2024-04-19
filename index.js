// Відео 56 хвилина рядок 43-50

import express from 'express';

import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations.js';

import checkAuth from './utils/checkAuth.js';
import Account from './models/Account.js';
import * as AccountController from './controllers/AccountController.js'

mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/app')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidation, AccountController.login);
app.post('/auth/register', registerValidation, AccountController.register);
app.get('/auth/me', checkAuth, AccountController.getMe);

app.listen(8083, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server Ok");
});

