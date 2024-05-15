import jsonData from '../caloCheckfront/src/data/sport.json' assert { type: "json" };
import ActivityForDayModel from '../models/activityForDay.js';

export const calculateActivityForDay = async (req, res) => {
    try {
        const { id: accountId } = req.params;
        const { activityItemName, quantityMinutes} = req.body;

        const activityItemData = jsonData.find(item => item.Activity === activityItemName);

        if (!activityItemData) {
            return res.status(404).json({ message: 'Дану активність не знайдено' });
        }

        const calories = (quantityMinutes * parseInt(activityItemData.typVaga)) / 60;

        let activityForDay = await ActivityForDayModel.findOne({ account: accountId }); // Виправлено ім'я моделі

        if (!activityForDay) {
            // Якщо запису не існує, створити новий
            activityForDay = new ActivityForDayModel({
                account: accountId,
                quantityCalories: calories,
                activityItem: [activityItemName],
            });
        } else {
            // Якщо запис існує, оновити його
            activityForDay.quantityCalories += calories;
            activityForDay.activityItem.push(activityItemName);
        }

        // Зберегти або оновити запис foodForDay
        await activityForDay.save();

        res.status(200).json({ message: 'Кількість калорій успішно розрахована і збережена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не вдалося зробити обрахунки' });
    }
};
