// Відео 56 хвилина рядок 43-50

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

import AccountModel from './models/Account.js';
import checkAuth from './utils/checkAuth.js';
import Account from './models/Account.js';

mongoose.connect('mongodb+srv://kursova2024:1111@cluster0.vvaabpa.mongodb.net/app')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', async (req, res) => {

    try {
        const account = await AccountModel.findOne({
            email: req.body.email
        });

        // Не знайдено пошту

        if (!account) {
            return res.status(404).json({
                message: 'Користувача не знайдено',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, account._doc.passwordHash);

        // Не знайдено пароль

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Не правильний логін або пароль',
            });
        }

        const token = jwt.sign({
            _id: account._id,
        },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...accountData } = account._doc;

        res.json({
            ...accountData,
            token
        }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося авторизуватися',
        })
    }

});

app.post('/auth/register', registerValidation, async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;

        //Шифрування паролю

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new AccountModel({
            email: req.body.email,
            passwordHash: hash,
            userName: req.body.userName,
        });

        const account = await doc.save();

        const token = jwt.sign({
            _id: account._id,
        },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...accountData } = account._doc;

        res.json({
            ...accountData, token
        }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося зареєструватися',
        })
    }
});

app.get('/auth/me', checkAuth, async (req, res) => {
    try {
        const account = await AccountModel.findById(req.accountId);
        if (!account) {
            return res.status(404).json({
                message: 'Користувача не знайдено';
            })
        }
        const { passwordHash, ...accountData } = account._doc;

        res.json({
            ...accountData, token
        }
        );

    } catch (err) {

    }
});

app.listen(8083, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server Ok");
});

