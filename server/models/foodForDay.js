import mongoose from 'mongoose';

const FoodForDaySchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    quantityCalories: {
        type: Number,
        required: true,
    }, 
    foodItem: {
        type: Array,
        default: [],
    }, 
}, {
    timestamps: true,
});


export default mongoose.model('FoodForDay', FoodForDaySchema);
