import Button from "../components/Button/Button";
import HeaderMain from "../components/HeaderMain/HeaderMain";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n'

export const MainPage = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useContext(LanguageContext);

  const handleGoToAuthPage = () => {
    navigate("/auth");
  };
  const handleGoToRegisterPage = () => {
    navigate("/register");
  };
  return (
    <body className="page_main">
      <HeaderMain />
      <main className="main">
        <div className="sections-wrapper">
          <section className="first">
            <p className="little_text">
              {i18next.t('main.first_section.little_text')} 
            </p>
            <p className="main_text">{i18next.t('main.first_section.main_text')}</p>
            <Button
              buttonClass="button_main"
              handleClick={handleGoToRegisterPage}
            >
              {i18next.t('main.first_section.read_more')}
            </Button>
          </section>
          <section className="second">
            <p className="main_text">
              users are already eating {" "}
              <span style={{ fontWeight: 700, textDecoration: "underline" }}>
                properly!
              </span>
            </p>
            <p className="little_text">
              What <span style={{ fontWeight: 700 }}>prevents</span> you?
            </p>
          </section>
          <section className="third">
            <p className="main_text">What are <span style={{ fontWeight: 700 }}>calories</span>?</p>
            <p className="little_text">
              <span style={{ fontWeight: 700 }}>Calories</span> - is the unit of energy used for
              determining the amount of energy obtained from food and
              we use to support the vital processes of the body.{" "}
            </p>
            <p className="little_text" style={{ marginTop: 60 }} >
              Calories are important for <span style={{ fontWeight: 700 }}>provision of energy </span>, equired for operation
              organs, exercise and other daily activities
              activities.
            </p>
          </section>

          <section className="fourth">
            <p className="main_text">Why it is important to count <span style={{ fontWeight: 700 }} >calories</span>?</p>
            <p className="little_text" >
              Calorie counting is important for certain reasons.
            </p>
            <p className="little_text" style={{ marginTop: 60 }}>
              <span style={{ fontWeight: 700, textDecoration: "underline" }} >FIRSTLY</span>, it helps
              control weight and maintain a healthy level of fitness.
              A balanced amount of calories meets the needs of the body,
              avoiding overweight or malnutrition.
            </p>
            <p className="little_text" style={{ marginTop: 60 }}>
              <span style={{ fontWeight: 700, textDecoration: "underline" }} >SECONDLY</span>, calorie control can promote a healthy lifestyle and
              prevention of diseases. Excessive calorie intake can lead
              to the development of obesity, diabetes, cardiovascular disease and
              other health problems.
            </p>
          </section>
          <section className="fifth">
            <p className="main_text">{i18next.t('main.fifth_section.main_text')}</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                buttonClass="button_main_fifth_register"
                handleClick={handleGoToRegisterPage}
              >
                {i18next.t('main.fifth_section.sign_up')}
              </Button>
              <Button buttonClass="button_main_fifth_auth" handleClick={handleGoToAuthPage}>
              {i18next.t('main.fifth_section.sign_in')}
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer></Footer>
    </body>
  );
};

