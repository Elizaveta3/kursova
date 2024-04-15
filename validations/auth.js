import { body } from 'express-validator'

export const registerValidation = [
    body('email','Неправильний формат пошти').isEmail(),
    body('password','Пароль має бути не менш, ніж 5 символів').isLength({ min: 5}),
    body('userName','Імʼя користувача має бути не менше 2 символів').isLength({ min: 2})

];