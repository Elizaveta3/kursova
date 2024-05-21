import React, { useState } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import RadioBox from '../components/RadioBox/RadioBox';
import FormInput from '../components/FormInputFillProf/FormInputFillProf';
import './static/styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

export const FillPage = () => {
    const navigate = useNavigate();

    // Встановіть початкове значення для formData
    const [formData, setFormData] = useState({ gender: 'female',  goal: 'lose_weight' });
    const [errorMessage, setErrorMessage] = useState(null);
    const { currentUser } = useSelector(state => state.user);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'number') {
            setFormData({ ...formData, [name]: parseInt(value, 10) });
        } else if (type === 'text') {
            setFormData({ ...formData, [name]: value.trim() });
        } else if (type === 'radio') {
            setFormData({ ...formData, [name]: value });
        } else {
            console.log('Enter a valid value for the field', name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Отримання токену з localStorage
            if (!token) {
                throw new Error('The token could not be found');
            }

            // Перевірка на наявність обов'язкових полів
            const requiredFields = ['gender', 'age', 'height', 'weight', 'goal'];
            const missingFields = requiredFields.filter(field => !formData[field]);
            if (missingFields.length > 0) {
                throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            }

            setErrorMessage(null);
            const res = await fetch('/auth/fillProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            const accountId = currentUser._id;
            const afterRes = await fetch(`/auth/profile/calo/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const secondData = await afterRes.json();
            if (!afterRes.ok) {
                throw new Error(secondData.message);
            }
            console.log('Отримані дані:', data);
            console.log('Отримані дані:', secondData);
            navigate('/profile');
        } catch (error) {
            console.error('Error sending request:', error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="page_fill_profile">
            <main className="main">
                <section>
                    <form className="form_fill_profile" onSubmit={handleSubmit}>
                        <h1>Fill profile</h1>
                        <fieldset className="form_reg_wrap">
                            <p className="text_input_sex">Choose your gender</p>
                            <p className="form_sex">
                                <RadioBox
                                    label="Female"
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    checked={formData.gender === 'female'} // Додано атрибут checked
                                />
                                <RadioBox
                                    label="Male"
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    checked={formData.gender === 'male'} // Додано атрибут checked
                                />
                            </p>
                            <p className="form_input_fill_prof">
                                <FormInput
                                    placeholder="Write your age (years)"
                                    name="age"
                                    onChange={handleChange}
                                    id="age"
                                />
                                <FormInput
                                    placeholder="Write your height (cm)"
                                    name="height"
                                    onChange={handleChange}
                                    id="height"
                                />
                                <FormInput
                                    placeholder="Write your weight (kg)"
                                    name="weight"
                                    onChange={handleChange}
                                    id="weight"
                                />
                            </p>
                            <p className="text_input_goal">Choose your goal</p>
                            <p className="form_goal">
                                <RadioBox
                                    label="Losing weight"
                                    name="goal"
                                    value="lose_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'lose_weight'} 
                                />
                                <RadioBox
                                    label="Maintain current weight"
                                    name="goal"
                                    value="maintain_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'maintain_weight'}
                                />
                                <RadioBox
                                    label="Gain weight"
                                    name="goal"
                                    value="gain_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'gain_weight'}
                                />
                            </p>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            <p className="form_buttom">
                                <Button buttonClass="submit_button_reg" type="submit" onSubmit={handleSubmit}>
                                    Sign up
                                </Button>
                            </p>
                        </fieldset>
                    </form>
                </section>
            </main>
        </div>
    );
};
