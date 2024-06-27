import logo from './LOGO 2.svg'
import Button from '../Button/Button'
import './HeaderMain.css'
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import i18next from '../../i18n';

export default function HeaderMain() {
    const navigate = useNavigate();

    const handleGoToAuthPage = () => {
        navigate('/authEnter');
    };
    const handleGoToRegisterPage = () => {
        navigate('/register');
    };
    const handleGoToContactPage = () => {
        navigate('/contacts');
    };
    const { currentLanguage } = useContext(LanguageContext);
    
    return (<header className="header">
        <div className="wrapper_main">
            <div className="header_wrappper_main">
                <div className="header_logo">
                    <a href="/" className="header_logo_link">
                        <img src={logo} alt="logo" className="header_logo_pic" />
                    </a>
                </div>
                <div className="language_switcher">
                    <span className={currentLanguage === 'ua' ? 'active_language' : ''} onClick={() => i18next.changeLanguage('ua')}>УКР</span>
                    <span> | </span>
                    <span className={currentLanguage === 'en' ? 'active_language' : ''} onClick={() => i18next.changeLanguage('en')}>ENG</span>
                </div>
                <div className="container_header_nav">
                    <nav className="header_nav">
                        <ul className="header_list">
                            <li className="header_item">
                                <Button buttonClass="header_button_main" handleClick={handleGoToRegisterPage}>{i18next.t('header.sign_up')}</Button>
                                <Button buttonClass="header_button_main" handleClick={handleGoToAuthPage}>{i18next.t('header.sign_in')}</Button>
                                <Button buttonClass="header_button_main" handleClick={handleGoToContactPage}>{i18next.t('header.contacts')}</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>)
}