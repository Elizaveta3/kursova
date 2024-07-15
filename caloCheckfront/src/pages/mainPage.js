import './static/styles/style.min.css'
import Button from "../components/Button/Button";
import HeaderMain from "../components/HeaderMain/HeaderMain";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n'

export const MainPage = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useContext(LanguageContext);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    i18next.on('initialized', () => {
      setIsInitialized(true);
    });
    if (i18next.isInitialized) {
      setIsInitialized(true);
    }
  }, []);

  const handleGoToAuthPage = () => {
    navigate("/auth");
  };
  const handleGoToRegisterPage = () => {
    navigate("/register");
  };

  if (!isInitialized) {
    return <div>Завантаження...</div>;
  }

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
            <p className="main_text"
              dangerouslySetInnerHTML={{ __html: i18next.t('main.second_section.main_text') }}
            />
            <p className="little_text"
              dangerouslySetInnerHTML={{ __html: i18next.t('main.second_section.little_text') }}
            />
          </section>
          <section className="third">
            <p className="main_text"
              dangerouslySetInnerHTML={{ __html: i18next.t('main.third_section.main_text') }}
            />
            <p
              className="little_text"
              dangerouslySetInnerHTML={{ __html: i18next.t('main.third_section.little_text') }}
            />
            <p className="little_text" style={{ marginTop: 60 }}
              dangerouslySetInnerHTML={{ __html: i18next.t('main.third_section.little_text_2') }}
            />
          </section>

          <section className="fourth">
            <p className="main_text"
              dangerouslySetInnerHTML={{ __html: i18next.t('main.fourth_section.main_text') }} />
            <p className="little_text" >
              {i18next.t('main.fourth_section.little_text')}
            </p>
            <p
              className="little_text"
              style={{ marginTop: 60 }}
              dangerouslySetInnerHTML={{ __html: i18next.t('main.fourth_section.little_text_2') }}
            />
            <p
              className="little_text"
              style={{ marginTop: 60 }}
              dangerouslySetInnerHTML={{ __html: i18next.t('main.fourth_section.little_text_3') }}
            />
          </section>
          <section className="fifth">
            <p
              className="main_text"
              dangerouslySetInnerHTML={{ __html: i18next.t('main.fifth_section.main_text') }}
            />
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

