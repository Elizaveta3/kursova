import CaloriesNormModel from '../models/CaloriesNorm.js';
import ProfileModel from '../models/Profile.js';

export const calculateNorm = async (req, res) => {
    try {
        // Получаем ID профиля из запроса
        const profileId = req.body.profileId;

        // Извлекаем данные профиля из базы данных по его ID
        const profile = await ProfileModel.findById(profileId);

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

        // Создаем или обновляем запись о норме калорий в базе данных
        const result = await CaloriesNormModel.create({
            profile: profileId,
            caloriesNorm: caloriesNorm,
        });

        res.json(result);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не вдалося зробити обрахунки',
        });
    }
};
