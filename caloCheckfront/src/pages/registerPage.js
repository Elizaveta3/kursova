import React, { useState } from 'react'
import Header from '../components/Header/Header'
import { Alert } from '@mui/material';
import './static/styles/styles.css'
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";


export const RegisterPage = () => {
    const navigate = useNavigate();

    const handleGoToAuthPage = () => {
        navigate("/auth");
    };
    const handleGoToFillPage = () => {
        navigate("/fillProfile", { state: { accountId: formData.accountId } });
    };
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.email || !formData.password) {
            return setErrorMessage('Будь-ласка, заповність всі поля.');
        }
        try {
            setErrorMessage(null);
            const res = await fetch('/auth/register', {
                method: 'POST', // додайте метод POST або GET, який вам потрібен
                body: JSON.stringify(formData), // дані форми, які ви хочете надіслати
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            if (res.ok) {
                setFormData({ ...formData, accountId: data.accountId });
                handleGoToFillPage();
            }
            console.log('Отримані дані:', data); // Виводимо отримані дані в консоль
        } catch (error) {
            console.error('Помилка під час відправлення запиту:', error);
        }
    };


    return (
        <>
            <div className="page_reg">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_reg" onSubmit={handleSubmit}>
                            <h1>Реєстрація</h1>
                            <fieldset className="form_reg_wrap">
                                <p className="text_input">Введіть дані.</p>
                                <p className="form_input">
                                    <input type="text" className="form_input_field" placeholder="Username" id='userName' onChange={handleChange} />
                                    <input type="email" className="form_input_field" placeholder="E-mail" id='email' onChange={handleChange} />
                                    <input type="password" className="form_input_field" placeholder="Password" id='password' onChange={handleChange} />
                                </p>
                                {errorMessage && (
                                    <Alert severity="error">
                                        {errorMessage}
                                    </Alert>
                                )}
                                <p className="form_buttom">
                                    <Button
                                        buttonClass="submit_button_reg" type='submit'

                                    >
                                        Далі
                                    </Button>
                                </p>
                                <p>
                                    <Button
                                        buttonClass="submit_button_enter"
                                        handleClick={handleGoToAuthPage}
                                    >
                                        Увійти
                                    </Button>
                                </p>
                                
                            </fieldset>
                        </form>
                    </section>
                </main >
            </div >
        </>
    )
}