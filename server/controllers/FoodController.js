import jsonDataEN from '../../caloCheckfront/src/data/calories.json' assert { type: "json" };
import jsonDataUA from '../../caloCheckfront/src/data/caloriesUKR.json' assert { type: "json" };
import FoodForDayModel from '../models/foodForDay.js';

export const calculateFoodForDay = async (req, res) => {
    try {
        const { id: accountId } = req.params;
        const { foodItemName, quantityGrams, language = 'en' } = req.body; // Default to 'en' if language is not provided

        // Select the appropriate dataset based on the language
        const dataset = language === 'ua' ? jsonDataUA : jsonDataEN;

        // Find the food item data in the selected dataset
        const foodItemData = dataset.find(item => item.FoodItem === foodItemName);

        if (!foodItemData) {
            return res.status(404).json({ message: 'Продукт не знайдено' });
        }

        // Calculate the calories based on the provided quantity in grams
        const calories = Math.round((quantityGrams * parseInt(foodItemData.Cals_per100grams)) / 100);

        // Check if a foodForDay record exists for the account
        let foodForDay = await FoodForDayModel.findOne({ account: accountId });

        if (!foodForDay) {
            // If no record exists, create a new one
            foodForDay = new FoodForDayModel({
                account: accountId,
                quantityCalories: calories,
                caloriesForProduct: [calories],
                quantityGrams: [quantityGrams],
                foodItem: [foodItemName],
            });
        } else {
            // If a record exists, update it
            foodForDay.quantityCalories += calories;
            foodForDay.caloriesForProduct.push(calories);
            foodForDay.quantityGrams.push(quantityGrams);
            foodForDay.foodItem.push(foodItemName);
        }

        // Save or update the foodForDay record
        await foodForDay.save();

        res.status(200).json({ message: 'Кількість калорій успішно розрахована і збережена', caloriesForProduct: calories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не вдалося зробити обрахунки' });
    }
};

export const getCalculateEaten = async (req, res) => {
    try {
        const accountId = req.params.id;
        const profile = await FoodForDayModel.findOne({ account: accountId });
        res.status(200).json(profile); 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося знайти інформацію про зʼїдені калорій',
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const accountId = req.params.id;
        const food = req.body.foodItem;

        let foodForDay = await FoodForDayModel.findOne({ account: accountId });

        if (!foodForDay) {
            return res.status(404).json({ message: 'Акаунт не знайдено' });
        }

        const index = foodForDay.foodItem.indexOf(food);

        if (index === -1) {
            return res.status(404).json({ message: 'Продукт не знайдено' });
        }
        
        const removedCalories = foodForDay.caloriesForProduct[index];

        foodForDay.foodItem.splice(index, 1);
        foodForDay.quantityGrams.splice(index, 1);
        foodForDay.caloriesForProduct.splice(index, 1);
    
        foodForDay.quantityCalories -= removedCalories;

        await foodForDay.save();

        res.status(200).json({ message: 'Продукт успішно видалений' });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося видалити продукт',
        });
    }
};