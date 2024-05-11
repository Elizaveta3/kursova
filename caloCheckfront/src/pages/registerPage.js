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
                            <h1>Sign up</h1>
                            <fieldset className="form_reg_wrap">
                                <p className="text_input">Enter the data.</p>
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
                                        Next
                                    </Button>
                                </p>
                                <p>
                                    <Button
                                        buttonClass="submit_button_enter"
                                        handleClick={handleGoToAuthPage}
                                    >
                                        Sign in
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