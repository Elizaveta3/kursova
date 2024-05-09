import CaloriesNormModel from '../models/CaloriesNorm.js';
import ProfileModel from '../models/Profile.js';
import AccountModel from '../models/Account.js';

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
        const accountId = req.body.accountId;
        let profileValue = req.body.profile;

        if (!profileValue) {
            // Якщо profile відсутнє або має значення null, отримати нове значення
            profileValue = await getNextProfileValue();
        }

        // Знаходимо профіль за айді акаунта
        const profile = await ProfileModel.findOne({ account: accountId });

        if (!profile) {
            return res.status(404).json({ message: 'Профіль не знайдено' });
        }

        // Расчет нормы калорий
        let caloriesNorm;
        if (profile.gender === 'female') {
            switch (profile.goal) {
                case 'lose_weight':
                    caloriesNorm = ((profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) - 161) - 500;
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
                    caloriesNorm = ((profile.weight * 10) + (profile.height * 6.25) - (profile.age * 5) + 5) - 500;
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

        const doc = new CaloriesNormModel({
            account: accountId,
            profile: profileValue, // Додаємо значення profile
            caloriesNorm: caloriesNorm,
        });

        const result = await doc.save();

        res.json(result);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не вдалося зробити обрахунки',
        });
    }
};
