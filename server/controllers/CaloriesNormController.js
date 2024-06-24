import CaloriesNormModel from '../models/CaloriesNorm.js';
import ProfileModel from '../models/Profile.js';
import activityForDayModel from '../models/activityForDay.js';
import foodForDayModel from '../models/foodForDay.js';
import CaloriesNorm from '../models/CaloriesNorm.js';

// Функція для отримання наступного значення для profile
const getNextProfileValue = async () => {
    try {
        // Знайти останнє значення profile в колекції CaloriesNorm
        const lastProfileDoc = await CaloriesNormModel.findOne({}, { profile: 1 }).sort({ profile: -1 });

        // Якщо в колекції вже є документи, повернути значення profile + 1
        if (lastProfileDoc) {
            return lastProfileDoc.profile + 1;
        } else {
            // Якщо колекція пуста, повернути 1 або інше початкове значення
            return 1; // Наприклад, початкове значення може бути 1
        }
    } catch (error) {
        console.error('Помилка при отриманні наступного значення для profile:', error);
        throw error;
    }
};

export const calculateNorm = async (req, res) => {
    try {
        const accountId = req.params.id;
        let profileValue = req.body.profile;

        if (!profileValue) {
            profileValue = await getNextProfileValue();
        }

        const profile = await ProfileModel.findOne({ account: accountId });

        if (!profile) {
            return res.status(404).json({ message: 'Профіль не знайдено' });
        }

        let caloriesNorm;
        if (profile.gender === 'female') {
            switch (profile.goal) {
                case 'lose_weight':
                    caloriesNorm = ((profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) - 161) - 300;
                    break;
                case 'maintain_weight':
                    caloriesNorm = (profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) - 161;
                    break;
                case 'gain_weight':
                    caloriesNorm = ((profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) - 161) + 500;
                    break;
                default:
                    throw new Error('Неправильная цель');
            }
        } else if (profile.gender === 'male') {
            switch (profile.goal) {
                case 'lose_weight':
                    caloriesNorm = ((profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) + 5) - 200;
                    break;
                case 'maintain_weight':
                    caloriesNorm = (profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) + 5;
                    break;
                case 'gain_weight':
                    caloriesNorm = ((profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) + 5) + 500;
                    break;
                default:
                    throw new Error('Неправильная цель');
            }
        } else {
            throw new Error('Неправильный пол');
        }

        caloriesNorm = Math.round(caloriesNorm);

        const result = await CaloriesNormModel.findOneAndUpdate(
            { account: accountId },
            {
                profile: profileValue,
                caloriesNorm: caloriesNorm,
            },
            { new: true, upsert: true } // Return the updated document or create if not found
        );

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не вдалося зробити обрахунки',
        });
    }
};

export const getCalculateNorm = async (req, res) => {
    try {
        const accountId = req.params.id;
        const profile = await CaloriesNormModel.findOne({ account: accountId });
        res.status(200).json(profile); // Відправлення знайденого профілю у відповідь
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося знайти інформацію про норму калорій',
        });
    }
};

export const getLeftCalories = async (req, res) => {
    try {
        const accountId = req.params.id;
        const calories = await CaloriesNormModel.findOne({ account: accountId });
        const consumed = await foodForDayModel.findOne({ account: accountId });
        const burned = await activityForDayModel.findOne({ account: accountId });
        
        const consumedCalories = consumed ? consumed.quantityCalories : 0;
        const burnedCalories = burned ? burned.quantityCalories : 0;


        const leftCalories = calories.caloriesNorm - consumedCalories + burnedCalories;

        res.status(200).json(leftCalories);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося обрахувати калорії, що залишилися'
        })
    }
}
