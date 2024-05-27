import ProfileModel from '../models/Profile.js';

export const getProfile = async (req,res) => {
    try {
        const profileInfo = await ProfileModel.find().populate({path:"account", select: "userName"}).exec();
        res.json(profileInfo);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося знайти інформацію з профілів',
        })
    }
}
export const getOneProfile = async (req, res) => {
    try {
        const accountId = req.params.id;
        const profile = await ProfileModel.findOne({ account: accountId });
        res.status(200).json(profile); // Відправлення знайденого профілю у відповідь
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося знайти інформацію з профіля',
        });
    }
};
// 25.04 додала функцію видаленні інфи з профілю
export const removeProfile = async (req, res) => {
    try {
        const profileId = req.params.id;
        ProfileModel.findOneAndDelete(
            {
            _id: profileId
            },
            (err, doc) =>{
                if(err){
                    console.log(err);
                    res.status(500).json({
                        message: 'Не вдалося видалити інформацію з профіля',
                    });
                }
                if(!doc){
                    res.status(404).json({
                        message: 'Не вдалося знайти профіля',
                    });
                }
                res.json({
                    success: true,
                });

            },
        ); 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося знайти інформацію з профіля',
        });
    }
};
// 25.04 додала функцію оновлення інфи з профілю
export const updateProfile = async (req, res) => {
    try {
        const profileId = req.params.id;
        await ProfileModel.updateOne(
            {
            _id: profileId
            },
            {
                gender: req.body.gender,
                account: req.accountId,
                age: req.body.age,
                height: req.body.height,
                weight: req.body.weight,
                //гол отримаємо з іншої таблиці потім змінемо
                goal: req.body.goal, 
            },
        ); 
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося оновити інформацію з профіля',
        });
    }
};


export const fillProfile = async (req,res) => {
    try{

        const doc = new ProfileModel({
            gender: req.body.gender,
            account: req.accountId,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
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

