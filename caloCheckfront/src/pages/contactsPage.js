import React, { useState } from 'react';
import HeaderContacts from '../components/HeaderContacts/Header'
import FormRowForEmail from '../components/FormRowForEmail/FormRowForEmail';
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";

export const Contacts = () => {
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

    return (
        <>
            <body className="page_contacts">
                <HeaderContacts />
                <div className="form_welcome" onSubmit={handleSubmit}>
                    <h1>WELCOME!</h1>
                    <form className="form_container_welcome">
                    <div className="form_fields">
                        <FormRowForEmail
                            label="Name"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            onChange={handleChange}
                        />
                        <FormRowForEmail
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            onChange={handleChange}
                        />
                        <FormRowForEmail
                            label="Message"
                            type="textarea"
                            id="message"
                            name="message"
                            placeholder="Your message"
                            onChange={handleChange}
                            className="message-input"
                        />
                         </div>
                        <div className="form_button">
                            <Button buttonClass="header_button_contacts" type="submit" onSubmit={handleSubmit}>
                                Send
                            </Button>
                        </div>
                    </form>
                </div>
                <form className="contact_info">
                    <h1 style={{ marginBottom: "60px" }}
                    >CONTACT INFORMATION</h1>
                    <p>If you have comments or suggestions, or questions about cooperation, write or call us.</p>
                    <p>E-mail: admincalo@ukr.net.</p>

                </form>
                <Footer></Footer>

            </body>
        </>

    );
};
