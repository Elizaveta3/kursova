import React from 'react';
import Header from '../../components/Header/Header';
import Button from "../../components/Button/Button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const ForgotPass = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const handleGoToAuthPage = () => {
        navigate("/authEnter");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            return setErrorMessage('Please fill a field');
        }
        try {
            setErrorMessage(null);
            const res = await fetch('/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.status !== 200) {
                return setErrorMessage(data.message);
            }

            if (res.ok) {
                console.log("Success")
            }

            console.log('The received data:', data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <>
            <body className="page_enter">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_enter" onSubmit={handleSubmit}>
                            <div className='main_block_forgot_pass'>
                                <Button
                                    buttonClass="return_button" type="submit"
                                    handleClick={handleGoToAuthPage}
                                >
                                </Button>
                                <h1>Forgot Password</h1>
                            </div>

                            <fieldset className="form_enter_wrap">
                                <p className="text_input">Enter the email.</p>
                                <div className="form_input">
                                    <input type="text" className="form_input_field" placeholder="Email" id='email' onChange={handleChange} />
                                </div>
                                <p className="form_button">
                                    <Button
                                        buttonClass="submit_button" type="submit"
                                    >
                                        Confirm
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
