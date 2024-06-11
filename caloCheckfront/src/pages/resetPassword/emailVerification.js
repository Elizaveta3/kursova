import React from 'react';
import Header from '../../components/Header/Header';
import Button from "../../components/Button/Button";
import { useState } from 'react';

export const EmailVerification = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
   
    return (
        <>
            <body className="page_enter">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_enter">
                            <h1>Email Verification</h1>
                            <fieldset className="form_enter_wrap">
                                <p className="text_input">We have sent a code to your email.</p>
                                <div className="form_input">
                                    <input type="text" className="form_input_field" placeholder="Code" id='code' />
                                </div>
                                <p className="form_button">
                                    <Button
                                        buttonClass="submit_button" type="submit"
                                    >
                                        Verify Account
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
