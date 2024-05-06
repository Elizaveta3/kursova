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
    const { token } = useLocation().state;

    const handleGoToAuthPage = () => {
        navigate('/auth');
    };

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'radio' && checked) {
            setFormData({ ...formData, [name]: value });
        } else if (type !== 'radio') {
            if (type === 'number' || (type === 'text' && !isNaN(value))) {
                setFormData({ ...formData, [name]: type === 'number' ? parseInt(value, 10) : value.trim() });
            } else {
                console.log('Введіть число для поля', name);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Перевірка на наявність обов'язкових полів
            const requiredFields = ['gender', 'age', 'height', 'weight', 'goal'];
            const missingFields = requiredFields.filter(field => !formData[field]);
            if (missingFields.length > 0) {
                throw new Error(`Будь-ласка, заповніть всі обов'язкові поля: ${missingFields.join(', ')}`);
            }
    
            setErrorMessage(null);
            const res = await fetch('/auth/fillProfile', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
    
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
                                    label="Жінка"
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    id="gender"
                                />
                                <RadioBox
                                    label="Чоловік"
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    id="gender2"
                                />
                            </p>
                            <p className="form_input_fill_prof">
                                <FormInput
                                    placeholder="Напишіть свій вік"
                                    name="age"
                                    type="number"
                                    onChange={handleChange}
                                />
                                <FormInput
                                    placeholder="Напишіть свій зріст"
                                    name="height"
                                    type="number"
                                    onChange={handleChange}
                                />
                                <FormInput
                                    placeholder="Напишіть свою вагу"
                                    name="weight"
                                    type="number"
                                    onChange={handleChange}
                                />
                            </p>
                            <p className="text_input_goal">Оберіть мету</p>
                            <p className="form_goal">
                                <RadioBox
                                    label="Худну"
                                    name="goal"
                                    value="lose_weight"
                                    onChange={handleChange}
                                    id="goal"
                                />
                                <RadioBox
                                    label="Підтримую поточну вагу"
                                    name="goal"
                                    value="maintain_weight"
                                    onChange={handleChange}
                                    id="goal2"
                                />
                                <RadioBox
                                    label="Набираю вагу"
                                    name="goal"
                                    value="gain_weight"
                                    onChange={handleChange}
                                    id="goal3"
                                />
                            </p>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            <p className="form_buttom">
                                <Button buttonClass="submit_button_reg" type="submit">
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
