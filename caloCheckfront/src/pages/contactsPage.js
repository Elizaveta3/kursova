import './static/styles/all.css'
import React, { useState, useContext, useEffect } from 'react';
import HeaderContacts from '../components/HeaderContacts/Header';
import FormRowForEmail from '../components/FormRowForEmail/FormRowForEmail';
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n';
import { Alert } from '@mui/material';

export const Contacts = () => {
    const { currentLanguage } = useContext(LanguageContext);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        i18next.on('initialized', () => {
            setIsInitialized(true);
        });
        if (i18next.isInitialized) {
            setIsInitialized(true);
        }
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrorMessage(null); // Reset error message on change
        setSuccessMessage(null); // Reset success message on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { name, email, message } = formData;
    
        try {
            const res = await fetch(`/auth/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            if (!res.ok) {
                const errorMessage = await res.json();
                throw new Error(errorMessage);
            }
    
            const data = await res.json(); // Розібрати відповідь як JSON
            console.log('Отримані дані:', data);
            setFormData({ name: '', email: '', message: '' }); // Очистити форму після успішного відправлення
            setSuccessMessage(i18next.t('page_contacts.successfull_send'));
        } catch (error) {
            console.error('Помилка відправлення запиту:', error.message);
            setErrorMessage(error.message);
        }
    };
    

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page_contacts">
            <HeaderContacts />
            <div className="form_welcome">
                <h1>{i18next.t('page_contacts.contacts_title')}</h1>
                <form className="form_container_welcome" onSubmit={handleSubmit}>
                    <div className="form_fields">
                        <FormRowForEmail
                            label={i18next.t('page_contacts.name')}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            placeholder={i18next.t('page_contacts.name_placeholder')}
                            onChange={handleChange}
                        />
                        <FormRowForEmail
                            label={i18next.t('page_contacts.email')}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            placeholder={i18next.t('page_contacts.email_placeholder')}
                            onChange={handleChange}
                        />
                        <FormRowForEmail
                            label={i18next.t('page_contacts.message')}
                            type="textarea"
                            id="message"
                            name="message"
                            value={formData.message}
                            placeholder={i18next.t('page_contacts.message_placeholder')}
                            onChange={handleChange}
                            className="message-input"
                        />
                    </div>
                    <div className="form_button">
                        <Button buttonClass="header_button_contacts" type="submit">
                            {i18next.t('page_contacts.send_button')}
                        </Button>
                    </div>
                    
                </form>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </div>
            <div className="contact_info">
                <h1 style={{ marginBottom: "60px" }}>
                    {i18next.t('page_contacts.contact_info')}
                </h1>
                <p>{i18next.t('page_contacts.suggestions')}</p>
                <p>{i18next.t('page_contacts.email_info')}</p>
            </div>
            <Footer />
        </div>
    );
};
