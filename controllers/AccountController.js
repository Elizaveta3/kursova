import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AccountModel from '../models/Account.js';

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
            message: 'Не вдалося зареєструватися',
        })
    }
};
export const login = async (req, res) => {
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

};
export const getMe = async (req, res) => {
    try {
        const account = await AccountModel.findById(req.accountId);
        if (!account) {
            return res.status(404).json({
                message: 'Користувача не знайдено'
            })
        }
        const { passwordHash, ...accountData } = account._doc;

        res.json(accountData);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Немає доступа',
        })
    }
};