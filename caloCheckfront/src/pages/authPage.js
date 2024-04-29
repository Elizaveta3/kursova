import React from 'react';
import Header from '../components/Header/Header';

export const AuthPage = () => {
    return (
        <>
            <body className="page_enter">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_enter">
                            <h1>Вхід</h1>
                            <fieldset className="form_enter_wrap">
                                <p className="text_input">Введіть дані.</p>
                                <div className="form_input">
                                    <input type="text" className="form_input_field" placeholder="Username" />
                                    <input type="password" className="form_input_field" placeholder="Password" />
                                </div>
                                <p className="form_button">
                                    <button type="submit" className="submit_button">Увійти</button>
                                </p>
                            </fieldset>
                        </form>
                    </section>
                </main>
            </body>
        </>
    );
};
