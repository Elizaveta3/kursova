import mongoose from 'mongoose';

const CaloriesNormSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required: true,
        unique: true
    },
    caloriesNorm: {
        type: Number,
        required: true,
    },  
},
{
    timestamps: true,
}
);

export default mongoose.model('CaloriesNorm',CaloriesNormSchema);