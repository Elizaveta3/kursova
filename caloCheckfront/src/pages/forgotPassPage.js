import React from 'react';
import Header from '../components/Header/Header';
import Button from "../components/Button/Button";
import { useState } from 'react';

export const ForgotPass = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
   
    return (
        <>
            <body className="page_enter">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_enter">
                            <h1>Forgot Password</h1>
                            <fieldset className="form_enter_wrap">
                                <p className="text_input">Enter the email.</p>
                                <div className="form_input">
                                    <input type="text" className="form_input_field" placeholder="Email" id='email' onChange={handleChange}/>
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
