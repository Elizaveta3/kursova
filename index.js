import express from 'express';

import mongoose from 'mongoose';

import cron from 'node-cron';

import { registerValidation, profileValidation } from './validations.js';

import {handleValidationErrors, checkAuth} from './utils/index.js';

import {AccountController, ProfileController, CaloriesNormController, FoodController, ActivityController} from './controllers/index.js'
import foodForDay from './models/foodForDay.js';
import activityForDay from './models/activityForDay.js'; 


mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/app')
    .then(() => console.log('DB ok'))

    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login',handleValidationErrors, AccountController.login);
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
app.get('/auth/diary/food/:id', FoodController.getCalculateEaten)

app.post('/auth/diary/activity/:id', ActivityController.calculateActivityForDay)
app.get('/auth/diary/activity/:id', ActivityController.getCalculateBurned)

app.post('/auth/forgot-password', AccountController.forgotPassword);

cron.schedule('0 0 * * *', () => {
    // Видаляємо всі дані з колекції CaloriesForDay
    foodForDay.deleteMany({})
        .then(() => {
            console.log('Дані з таблиці CaloriesForDay успішно очищені');
        })
        .catch(error => {
            console.error('Помилка при очищенні даних з таблиці CaloriesForDay:', error);
        });
});
cron.schedule('0 0 * * *', () => {
    // Видаляємо всі дані з колекції activityForDay
    activityForDay.deleteMany({})
        .then(() => {
            console.log('Дані з таблиці activityForDay успішно очищені');
        })
        .catch(error => {
            console.error('Помилка при очищенні даних з таблиці activityForDay:', error);
        });
});

app.listen(8084, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server Ok");
});



