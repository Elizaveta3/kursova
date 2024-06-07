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

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Reset Password CaloCheck',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });


    } catch(err){
        console.log(err);
    }
}