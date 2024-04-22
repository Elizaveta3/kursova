//таблиця Профіль

import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account',
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,   
    },
    height: {
        type: Number,
        required: true, 
    },
    weight: {
        type: Number,
        required: true, 
    },
    goal: {
        type: String,
        required: true, 
    },
},
{
    timestamps: true,
}
);

export default mongoose.model('Profile',ProfileSchema);