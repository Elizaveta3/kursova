import React from 'react'
import logo from './static/images/LOGO 2.svg'

export const RegisterPage = () => {
    return (
        <div className="page_reg">
            <header className="header">
                <div className="wrapper">
                    <div className="header_wrappper">
                        <div className="header_logo">
                            <a href="/" className="header_logo_link">
                                <img src={logo} alt="logo" className="header_logo_pic"/>
                            </a>
                        </div>
                        <nav className="header_nav">
                            <ul className="header_list">
                                <li className="header_item">
                                    <button className="header_button">Головна сторінка</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="main">
                <section>
                    <form className="form_reg">
                        <h1>Реєстрація</h1>
                        <fieldset className="form_reg_wrap">
                            <p className="text_input">Введіть дані.</p>
                            <p className="form_input">
                                <input type="text" className="form_input_field" placeholder="Username"/>
                                <input type="text" className="form_input_field" placeholder="E-mail"/>
                                <input type="text" className="form_input_field" placeholder="Password"/>
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