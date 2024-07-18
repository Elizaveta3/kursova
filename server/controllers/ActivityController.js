import jsonDataEN from '../../caloCheckfront/src/data/sport.json' assert { type: "json" };
import jsonDataUA from '../../caloCheckfront/src/data/sportUKR.json' assert { type: "json" };
import ActivityForDayModel from '../models/activityForDay.js';

export const calculateActivityForDay = async (req, res) => {
    try {
        const { id: accountId } = req.params;
        const { activityItemName, quantityMinutes, language = 'en'} = req.body;

        const dataset = language === 'ua' ? jsonDataUA : jsonDataEN;

        const activityItemData = dataset.find(item => item.Activity === activityItemName);

        if (!activityItemData) {
            return res.status(404).json({ message: 'Дану активність не знайдено' });
        }

        const calories =  Math.round((quantityMinutes * parseInt(activityItemData.typVaga)) / 60);

        let activityForDay = await ActivityForDayModel.findOne({ account: accountId }); // Виправлено ім'я моделі

        if (!activityForDay) {
            // Якщо запису не існує, створити новий
            activityForDay = new ActivityForDayModel({
                account: accountId,
                quantityCalories: calories,
                caloriesForActivity: [calories],
                quantityMinutes: [quantityMinutes],
                activityItem: [activityItemName],
            });
        } else {
            // Якщо запис існує, оновити його
            activityForDay.quantityCalories += calories;
            activityForDay.caloriesForActivity.push(calories);
            activityForDay.quantityMinutes.push(quantityMinutes);
            activityForDay.activityItem.push(activityItemName);
        }

        // Зберегти або оновити запис foodForDay
        await activityForDay.save();

        res.status(200).json({ 
            message: 'Кількість калорій успішно розрахована і збережена',
            caloriesForActivity: calories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не вдалося зробити обрахунки' });
    }
};
export const getCalculateBurned = async (req, res) => {
    try {
        const accountId = req.params.id;
        const profile = await ActivityForDayModel.findOne({ account: accountId });
        res.status(200).json(profile); 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося знайти інформацію про спалені калорій',
        });
    }
};