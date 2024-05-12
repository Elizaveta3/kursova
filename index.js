import express from 'express';

import mongoose from 'mongoose';

import cron from 'node-cron';

import { registerValidation, loginValidation, profileValidation } from './validations.js';

import {handleValidationErrors, checkAuth} from './utils/index.js';

import {AccountController, ProfileController, CaloriesNormController, FoodController} from './controllers/index.js'
import foodForDay from './models/foodForDay.js';


mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/app')
    .then(() => console.log('DB ok'))

    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidation,handleValidationErrors, AccountController.login);
app.post('/auth/register', registerValidation,handleValidationErrors, AccountController.register);
app.get('/auth/me', checkAuth, AccountController.getMe);

app.get('/auth/profile', ProfileController.getProfile);
app.get('/auth/profile/:id', ProfileController.getOneProfile);
app.delete('/auth/profile/:id', checkAuth,ProfileController.removeProfile);
app.patch('/auth/profile/:id', checkAuth, profileValidation,handleValidationErrors,ProfileController.updateProfile);
app.post('/auth/fillProfile',checkAuth, profileValidation, handleValidationErrors, ProfileController.fillProfile);

app.post('/auth/profile/calo/:id', CaloriesNormController.calculateNorm)
app.get('/auth/profile/calo/:id', CaloriesNormController.getCalculateNorm)

app.post('/auth/diary/food/:id', FoodController.calculateFoodForDay)

cron.schedule('02 18 * * *', () => {
    // Видаляємо всі дані з колекції CaloriesForDay
    foodForDay.deleteMany({})
        .then(() => {
            console.log('Дані з таблиці CaloriesForDay успішно очищені');
        })
        .catch(error => {
            console.error('Помилка при очищенні даних з таблиці CaloriesForDay:', error);
        });
});


app.listen(8084, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server Ok");
    // cron.schedule('* * * * *', () => {
    //     console.log('running a task every minute');
    //   });
});



