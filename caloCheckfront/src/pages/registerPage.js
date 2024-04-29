import React from 'react'
import Header from '../components/Header/Header'
import './static/styles/styles.css'



export const RegisterPage = () => {
   

    return (
        <div className="page_reg">

            <main className="main">
                <Header />
                <section>
                    <form className="form_reg">
                        <h1>Реєстрація</h1>
                        <fieldset className="form_reg_wrap">
                            <p className="text_input">Введіть дані.</p>
                            <p className="form_input">
                                <input type="text" className="form_input_field" placeholder="Username" />
                                <input type="text" className="form_input_field" placeholder="E-mail" />
                                <input type="text" className="form_input_field" placeholder="Password" />
                            </p>
                            <p className="form_buttom">
                                <button type="submit" className="submit_button_reg">Зареєструватися</button>
                            </p>
                            <p>
                                <button type="submit" className="submit_button_enter">Увійти</button>
                            </p>
                        </fieldset>
                    </form>
                </section>
            </main>
        </div>
    )

}