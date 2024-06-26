import mongoose from 'mongoose';

const ActivityForDaySchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    quantityCalories: {
        type: Number,
        required: true,
    }, 
    activityItem: {
        type: Array,
        default: [],
    }, 
}, {
    timestamps: true,
});


export default mongoose.model('ActivityForDay', ActivityForDaySchema);
