import React from 'react';
import Button from "../components/Button/Button";
import Header from '../components/Header/Header';
import RadioBox from '../components/RadioBox/RadioBox';
import FormInput from '../components/FormInputFillProf/FormInputFillProf';
import './static/styles/styles.css'
import { useNavigate } from "react-router-dom";

export const FillPage = () => {
    const navigate = useNavigate();

    const handleGoToProfile = () => {
        navigate("/profile");
    };
    const handleGoToAuthPage = () => {
        navigate("/auth");
      };

    return (
        <>
            <div className="page_fill_profile">
                <Header />
                <main className="main">
                    <section>
                        <form className="form_fill_profile">
                            <h1>Реєстрація</h1>
                            <fieldset className="form_reg_wrap">
                                <p className="text_input_sex">Оберіть стать</p>
                                <p className="form_sex">
                                    <RadioBox label="Жінка" name="gender" />
                                    <RadioBox label="Чоловік" name="gender" />
                                </p>
                                <p className="form_input_fill_prof">
                                    <FormInput placeholder="Напишіть свій вік" />
                                    <FormInput placeholder="Напишіть свій зріст" />
                                    <FormInput placeholder="Напишіть свою вагу" />
                                </p>
                                <p className="text_input_goal">Оберіть мету</p>
                                <p className="form_goal">
                                    <RadioBox label="Худну" name="goal" />
                                    <RadioBox label="Підтримую поточну вагу" name="goal" />
                                    <RadioBox label="Набираю вагу" name="goal" />
                                </p>
                                <p className="form_buttom">
                                    <Button buttonClass="submit_button_reg" handleClick={handleGoToProfile}>
                                        Зареєструватися
                                    </Button>
                                </p>
                                <p>
                                    <Button buttonClass="submit_button_enter" handleClick={handleGoToAuthPage}>
                                        Увійти
                                    </Button>
                                </p>
                            </fieldset>
                        </form>
                    </section>
                </main>
            </div>
        </>
    )
}