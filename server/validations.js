import { body } from 'express-validator'
// перевірки
export const loginValidation = [
    body('password','Пароль має бути не менш, ніж 5 символів').isLength({ min: 5}),
    body('userName','Імʼя користувача має бути не менше 2 символів').isLength({ min: 2})

];
export const registerValidation = [
    body('email','Неправильний формат пошти').isEmail(),
    body('password','Пароль має бути не менш, ніж 5 символів').isLength({ min: 5}),
    body('userName','Імʼя користувача має бути не менше 2 символів').isLength({ min: 2})
];

export const profileValidation = [
    body('age','Введіть число').isNumeric(),
    body('weight','Введіть число').isNumeric(),
    body('height','Введіть число').isNumeric()
];