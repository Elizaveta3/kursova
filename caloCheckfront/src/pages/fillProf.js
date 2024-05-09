import React, { useState } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import RadioBox from '../components/RadioBox/RadioBox';
import FormInput from '../components/FormInputFillProf/FormInputFillProf';
import './static/styles/styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';

export const FillPage = () => {
    const navigate = useNavigate();


    const handleGoToAuthPage = () => {
        navigate('/auth');
    };

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {

        const { name, value, type } = e.target;

        if (type === 'number') {
            setFormData({ ...formData, [name]: parseInt(value, 10) });
        } else if (type === 'text') {
            setFormData({ ...formData, [name]: value.trim() });
        }
        else if (type === 'radio') {
            setFormData({ ...formData, [name]: value });
        }
        else {
            console.log('Введіть коректне значення для поля', name);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Отримання токену з localStorage
            if (!token) {
                throw new Error('Не вдалося знайти токен');
            }
            // Перевірка на наявність обов'язкових полів
            const requiredFields = ['gender', 'age', 'height', 'weight', 'goal'];
            const missingFields = requiredFields.filter(field => !formData[field]);
            if (missingFields.length > 0) {
                throw new Error(`Будь-ласка, заповніть всі обов'язкові поля: ${missingFields.join(', ')}`);
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
                const data = await res.json();
                throw new Error(data.message);
            }
            console.log('Отримані дані:', data);
            navigate('/profile');
        } catch (error) {
            console.error('Помилка під час відправлення запиту:', error.message);
            setErrorMessage(error.message);
        }
    };


    return (
        <div className="page_fill_profile">
            <Header />
            <main className="main">
                <section>
                    <form className="form_fill_profile" onSubmit={handleSubmit}>
                        <h1>Реєстрація</h1>
                        <fieldset className="form_reg_wrap">
                            <p className="text_input_sex">Оберіть стать</p>
                            <p className="form_sex">
                                <RadioBox
                                    label="Female"
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                />
                                <RadioBox
                                    label="Male"
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                />
                            </p>
                            <p className="form_input_fill_prof">
                                <FormInput
                                    placeholder="Напишіть свій вік(роки)"
                                    name="age"
                                    onChange={handleChange}
                                    id="age"
                                />

                                <FormInput
                                    placeholder="Напишіть свій зріст(см)"
                                    name="height"
                                    onChange={handleChange}
                                    id="height"
                                />
                                <FormInput
                                    placeholder="Напишіть свій вагу(кг)"
                                    name="weight"
                                    onChange={handleChange}
                                    id="weight"
                                />
                            </p>
                            <p className="text_input_goal">Оберіть мету</p>
                            <p className="form_goal">
                                <RadioBox
                                    label="Худну"
                                    name="goal"
                                    value="lose_weight"
                                    onChange={handleChange}
                                />
                                <RadioBox
                                    label="Підтримую поточну вагу"
                                    name="goal"
                                    value="maintain_weight"
                                    onChange={handleChange}
                                />
                                <RadioBox
                                    label="Набираю вагу"
                                    name="goal"
                                    value="gain_weight"
                                    onChange={handleChange}
                                />

                            </p>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            <p className="form_buttom">
                                <Button buttonClass="submit_button_reg" type="submit" onSubmit={handleSubmit}>
                                    Зареєструватися
                                </Button>
                            </p>
                            <p>
                                <Button buttonClass="submit_button_enter" handleClick={handleGoToAuthPage}>
                                    Увійти
                                </Button>
                            </p>
                        </fieldset>
                    </form>
                </section>
            </main>
        </div>
    );
};
