import React, { useState, useContext, useEffect } from 'react';
import HeaderContacts from '../components/HeaderContacts/Header'
import FormRowForEmail from '../components/FormRowForEmail/FormRowForEmail';
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n'

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
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, message } = formData;

        try{
            const res = await fetch(`/auth/contacts`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            if (res.ok){
                console.log('Added');
            }
            console.log('The received data:', data);
        }catch (error) {
            console.error('Error sending request:', error.message);
            setErrorMessage(error.message);}
    };
    
    if (!isInitialized) {
        return <div>Завантаження...</div>;
      }

    return (
        <>
            <body className="page_contacts">
                <HeaderContacts />
                <div className="form_welcome" onSubmit={handleSubmit}>
                    <h1>{i18next.t('page_contacts.contacts_title')}</h1>
                    <form className="form_container_welcome">
                    <div className="form_fields">
                        <FormRowForEmail
                            label={i18next.t('page_contacts.name')}
                            type="text"
                            id="name"
                            name="name"
                            placeholder={i18next.t('page_contacts.name_placeholder')}
                            onChange={handleChange}
                        />
                        <FormRowForEmail
                            label={i18next.t('page_contacts.email')}
                            type="email"
                            id="email"
                            name="email"
                            placeholder={i18next.t('page_contacts.email_placeholder')}
                            onChange={handleChange}
                        />
                        <FormRowForEmail
                            label={i18next.t('page_contacts.message')}
                            type="textarea"
                            id="message"
                            name="message"
                            placeholder={i18next.t('page_contacts.message_placeholder')}
                            onChange={handleChange}
                            className="message-input"
                        />
                         </div>
                        <div className="form_button">
                            <Button buttonClass="header_button_contacts" type="submit" onSubmit={handleSubmit}>
                            {i18next.t('page_contacts.send_button')}
                            </Button>
                        </div>
                    </form>
                </div>
                <form className="contact_info">
                    <h1 style={{ marginBottom: "60px" }}
                    >{i18next.t('page_contacts.contact_info')}</h1>
                    <p>{i18next.t('page_contacts.suggestions')}</p>
                    <p>{i18next.t('page_contacts.email_info')}</p>

                </form>
                <Footer></Footer>

            </body>
        </>

    );
};
