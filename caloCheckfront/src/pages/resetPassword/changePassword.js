import React from 'react';
import Header from '../../components/Header/Header';
import Button from "../../components/Button/Button";
import { useState } from 'react';

export const ChangePassword = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
   
    return (
        <>
            <body className="page_enter">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_enter">
                            <h1>Change Password</h1>
                            <fieldset className="form_enter_wrap">
                                <p className="text_input">Enter the data.</p>
                                <div className="form_input">
                                    <input type="text" className="form_input_field" placeholder="New Password" id='password' />
                                    <input type="text" className="form_input_field" placeholder="Confirm Password" id='code' />
                                </div>
                                <p className="form_button">
                                    <Button
                                        buttonClass="submit_button" type="submit"
                                    >
                                        Reset password
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
