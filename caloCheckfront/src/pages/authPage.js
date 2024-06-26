import React from 'react';
import Header from '../components/Header/Header';
import { Alert } from '@mui/material';
import Button from "../components/Button/Button";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useContext } from 'react';
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from '../redux/user/userSlice';
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n'

export const AuthPage = () => {
    const [formData, setFormData] = useState({});
    const { error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const { currentLanguage } = useContext(LanguageContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.password) {
            return dispatch(signInFailure('Please,  fill in all fields'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.status !== 200) {
                dispatch(signInFailure(data.message));
                return;
            }
            if (res.ok) {
                dispatch(signInSuccess(data));
                localStorage.setItem('token', data.token);
                navigate('/fillProfile');
            }
            console.log('The received data:', data);
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
                            <h1>{i18next.t('page_enter.login_title')}</h1>
                            <fieldset className="form_enter_wrap">
                                <p className="text_input">{i18next.t('page_enter.confirm_data')}</p>
                                <div className="form_input">
                                    <input type="text" className="form_input_field" placeholder={i18next.t('page_enter.username_placeholder')} id='userName' onChange={handleChange}/>
                                    <input type="password" className="form_input_field" placeholder={i18next.t('page_enter.password_placeholder')} id='password'onChange={handleChange}/>
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
                                        {i18next.t('page_enter.sign_in_button')}
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
