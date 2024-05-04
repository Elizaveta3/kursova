import React, { useState } from 'react'
import Button from "../components/Button/Button";
import Header from '../components/Header/Header';
import RadioBox from '../components/RadioBox/RadioBox';
import FormInput from '../components/FormInputFillProf/FormInputFillProf';
import './static/styles/styles.css'
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from '@mui/material';

export const FillPage = () => {
    const navigate = useNavigate();
    const { account } = useLocation().state;

    const handleGoToAuthPage = () => {
        navigate("/auth");
    };

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.gender || !formData.age || !formData.height || !formData.weight || !formData.goal ) {
            return setErrorMessage('Будь-ласка, заповніть всі поля.');
        }
        try {
            setErrorMessage(null);
            const res = await fetch('/auth/fillProfile', {
                method: 'POST', 
                body: JSON.stringify({ ...formData, account }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            if (res.ok) {
                navigate('/profile');
            }
            console.log('Отримані дані:', data); // Виводимо отримані дані в консоль
        } catch (error) {
            console.error('Помилка під час відправлення запиту:', error);
        }
    };


    return (
        <>
            <div className="page_fill_profile">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_fill_profile"  onSubmit={handleSubmit}>
                            <h1>Реєстрація</h1>
                            <fieldset className="form_reg_wrap">
                                <p className="text_input_sex">Оберіть стать</p>
                                <p className="form_sex">
                                    <RadioBox label="Жінка" name="gender" value="female" onChange={handleChange} />
                                    <RadioBox label="Чоловік" name="gender" value="male" onChange={handleChange}/>
                                </p>
                                <p className="form_input_fill_prof">
                                    <FormInput placeholder="Напишіть свій вік" id = "age" onChange={handleChange}/>
                                    <FormInput placeholder="Напишіть свій зріст" id = "height" onChange={handleChange} />
                                    <FormInput placeholder="Напишіть свою вагу" id = "weight" onChange={handleChange}/>
                                </p>
                                <p className="text_input_goal">Оберіть мету</p>
                                <p className="form_goal">
                                    <RadioBox label="Худну" name="goal" value="lose_weight" onChange={handleChange}/>
                                    <RadioBox label="Підтримую поточну вагу" name="goal" value="maintain_weight" onChange={handleChange} />
                                    <RadioBox label="Набираю вагу" name="goal" value="gain_weight" onChange={handleChange}/>
                                </p>
                                {errorMessage && (
                                    <Alert severity="error">
                                        {errorMessage}
                                    </Alert>
                                )}
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
        </>
    )
}