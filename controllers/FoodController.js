import jsonData from '../caloCheckfront/src/data/calories.json' assert { type: "json" };
import FoodForDayModel from '../models/foodForDay.js';



export const calculateFoodForDay = async (req, res) => {
    try {
        const { id: accountId } = req.params;
        const { foodItemName, quantityGrams } = req.body;

        // Знайти дані про продукт з датасету за назвою
        const foodItemData = jsonData.find(item => item.FoodItem === foodItemName);

        if (!foodItemData) {
            return res.status(404).json({ message: 'Продукт не знайдено' });
        }

        // Розрахувати кількість калорій за введеною кількістю грамів
        const calories = (quantityGrams * parseInt(foodItemData.Cals_per100grams)) / 100;

        // Перевірити, чи існує вже запис foodForDay для обліку
        let foodForDay = await FoodForDayModel.findOne({ account: accountId }); // Виправлено ім'я моделі

        if (!foodForDay) {
            // Якщо запису не існує, створити новий
            foodForDay = new FoodForDayModel({
                account: accountId,
                quantityCalories: calories,
                foodItem: [foodItemName],
            });
        } else {
            // Якщо запис існує, оновити його
            foodForDay.quantityCalories += calories;
            foodForDay.foodItem.push(foodItemName);
        }

        // Зберегти або оновити запис foodForDay
        await foodForDay.save();

        res.status(200).json({ message: 'Кількість калорій успішно розрахована і збережена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не вдалося зробити обрахунки' });
    }
};
