import React from 'react';
import Header from '../components/Header/Header';
import { Alert } from '@mui/material';
import Button from "../components/Button/Button";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from '../redux/user/userSlice';

export const AuthPage = () => {
    const [formData, setFormData] = useState({});
    const { error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.password) {
            return dispatch(signInFailure('Будь-ласка, заповніть всі поля'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/profile');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };
    return (
        <>
            <body className="page_enter">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_enter"  onSubmit={handleSubmit} >
                            <h1>Вхід</h1>
                            <fieldset className="form_enter_wrap">
                                <p className="text_input">Введіть дані.</p>
                                <div className="form_input">
                                    <input type="text" className="form_input_field" placeholder="Username" id='userName' onChange={handleChange}/>
                                    <input type="password" className="form_input_field" placeholder="Password" id='password'onChange={handleChange}/>
                                </div>
                                {errorMessage && (
                                    <Alert severity="error">
                                        {errorMessage}
                                    </Alert>
                                )}
                                <p className="form_button">
                                    <Button
                                        buttonClass="submit_button" type="submit" onSubmit={handleSubmit}
                                    >
                                        Увійти
                                    </Button>
                                </p>
                                
                            </fieldset>
                        </form>
                    </section>
                </main>
            </body>
        </>
    );
};
