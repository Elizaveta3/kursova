// Таблиця Акаунт

import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    userName: {
        type: String,
        // required - обовʼязково
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,   
    },
    passwordHash: {
        type: String,
        required: true, 
    },
},
{
    timestamps: true,
}
);
export default mongoose.model('Account',AccountSchema);