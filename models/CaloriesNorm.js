import mongoose from 'mongoose';

const CaloriesNormSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    profile: {
        type: Number,
        default: 1,// Значення за замовчуванням - null
    },
    caloriesNorm: {
        type: Number,
        required: true,
    },  
}, {
    timestamps: true,
});


export default mongoose.model('CaloriesNorm', CaloriesNormSchema);
