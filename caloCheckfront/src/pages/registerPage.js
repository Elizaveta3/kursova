 import React, { useState, useContext } from 'react'
import Header from '../components/Header/Header'
import { Alert } from '@mui/material';
import './static/styles/styles.css'
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n'

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { currentLanguage } = useContext(LanguageContext);

    const handleGoToAuthPage = () => {
        navigate("/auth");
    };
    const handleGoToFillPage = async () => {
        try {
            // Отримуємо токен з сервера
            const res = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData), 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                // Зберігаємо токен у localStorage
                localStorage.setItem('token', data.token);
                // Переходимо на сторінку заповнення профілю з передачею об'єкта state, що містить токен
                navigate("/auth", { state: { token: data.token} });
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.email || !formData.password) {
            return setErrorMessage('Please fill all fields.');
        }
        if (formData.userName.length < 2) {
            return setErrorMessage('Username must be at least 2 characters long.');
        }
        if (formData.password.length < 5) {
            return setErrorMessage('Password must be at least 5 characters long');
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
                handleGoToFillPage();
            }
            console.log('The received data:', data); // Виводимо отримані дані в консоль
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };


    return (
        <>
            <div className="page_reg">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_reg" onSubmit={handleSubmit}>
                            <h1>{i18next.t('page_reg.register_title')}</h1>
                            <fieldset className="form_reg_wrap">
                                <p className="text_input">{i18next.t('page_reg.enter_data')}</p>
                                <p className="form_input">
                                    <input type="text" className="form_input_field" placeholder={i18next.t('page_reg.username_placeholder')} id='userName' onChange={handleChange} />
                                    <input type="email" className="form_input_field" placeholder={i18next.t('page_reg.email_placeholder')} id='email' onChange={handleChange} />
                                    <input type="password" className="form_input_field" placeholder={i18next.t('page_reg.password_placeholder')} id='password' onChange={handleChange} />
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
                                        {i18next.t('page_reg.next_button')}
                                    </Button>
                                </p>
                                <p>
                                    <Button
                                        buttonClass="submit_button_enter"
                                        handleClick={handleGoToAuthPage}
                                    >
                                        {i18next.t('page_reg.sign_in_button')}
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