import React from 'react'
import HeaderProfile from '../components/HeaderProfile/HeaderProfile'

import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();

    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/auth');
    };
    return (
        <>
        <body className="page_profile">
        <HeaderProfile click1={handleGoToDiary} click2={handleGoToAuthPage} child1="Щоденник" child2="Вийти"></HeaderProfile>
            <main className="main">
                <section>
                    <div className="form_profile">
                        {/* <h1>Вхід</h1>
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
                            
                        </fieldset> */}
                    </div>
                </section>
            </main>
        </body>
    </>
    )

}