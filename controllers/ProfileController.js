import ProfileModel from '../models/Profile.js';

/*export const getProfile (req,res) => {
    try {

    }
}*/

export const fillProfile = async (req,res) => {
    try{

        const doc = new ProfileModel({
            gender: req.body.gender,
            account: req.accountId,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            //гол отримаємо з іншої таблиці потім змінемо
            goal: req.body.goal,

        });

        const profile = await doc.save();

        res.json(profile);

    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити профіль',
        })
    }
}

