import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AccountModel from '../models/Account.js';
import nodemailer from 'nodemailer'

export const register = async (req, res) => {
    try {

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
            message: 'Failed to register',
        })
    }
};
export const login = async (req, res) => {
    try {
        const account = await AccountModel.findOne({
            userName: req.body.userName,
        });

        // Не знайдено ім’я користувача

        if (!account) {
            return res.status(404).json({
                message: 'No user found',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, account._doc.passwordHash);

        // Не знайдено пароль

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Incorrect login or password',
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
            message: 'Failed to register',
        })
    }

};
export const getMe = async (req, res) => {
    try {
        const account = await AccountModel.findById(req.accountId);
        if (!account) {
            return res.status(404).json({
                message: 'No user found'
            })
        }
        const { passwordHash, ...accountData } = account._doc;

        res.json(accountData);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No access',
        })
    }
};

export const forgotPassword = async (req, res) => {
    try{
        const email = req.body.email;
        const account = await AccountModel.findOne({email});
        if(!account){
            return res.json({message:"User is not registered"})
        }
         // Генерація випадкового 4-значного коду
         const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

         // Збереження коду в базі даних або у кеші
         account.verificationCode = verificationCode;
         account.verificationCodeExpires = Date.now() + 3600000; // код дійсний 1 годину
         await account.save();

        // Налаштування транспорту для Ukr.net
        const transporter = nodemailer.createTransport({
            host: 'smtp.ukr.net',
            port: 465,
            secure: true, // true для 465, false для інших портів
            auth: {
                user: 'admincalo@ukr.net', // замініть на вашу пошту
                pass: '0oqMVw5BZxBDWEie' // замініть на ваш пароль
            }
        });
          
          var mailOptions = {
            from: 'admincalo@ukr.net',
            to: email,
            subject: 'Reset Password CaloCheck',
            text: `Your verification code is ${verificationCode}. It is valid for 1 hour.`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return res.status(500).json({message: 'Failed to send email'});
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({message: 'Verification code sent to your email'});
            }
        });

    } catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}