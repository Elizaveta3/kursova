// Відео 56 хвилина рядок 43-50

import express from 'express';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, profileValidation } from './validations.js';

import {handleValidationErrors, checkAuth} from './utils/index.js';

import {AccountController, ProfileController} from './controllers/index.js'


mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/app')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidation,handleValidationErrors, AccountController.login);
app.post('/auth/register', registerValidation,handleValidationErrors, AccountController.register);
app.get('/auth/me', checkAuth, AccountController.getMe);

app.get('/profile', ProfileController.getProfile);
app.get('/profile/:id', ProfileController.getOneProfile);
app.delete('/profile/:id', checkAuth,ProfileController.removeProfile);
app.patch('/profile/:id', checkAuth, profileValidation,handleValidationErrors,ProfileController.updateProfile);
app.post('/profile',checkAuth, profileValidation, handleValidationErrors, ProfileController.fillProfile);


app.listen(8083, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server Ok");
});

