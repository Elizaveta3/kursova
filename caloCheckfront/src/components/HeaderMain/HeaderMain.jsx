import logo from './LOGO 2.svg'
import Button from '../Button/Button'
import './HeaderMain.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
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
    const [currentLanguage, setCurrentLanguage] = useState('ENG');
    const handleLanguageChange = (language) => {
        setCurrentLanguage(language);
    };
    return (<header className="header">
        <div className="wrapper_main">
            <div className="header_wrappper_main">
                <div className="header_logo">
                    <a href="/" className="header_logo_link">
                        <img src={logo} alt="logo" className="header_logo_pic" />
                    </a>
                </div>
                <div className="language_switcher">
                    <span className={currentLanguage === 'UKR' ? 'active_language' : ''} onClick={() => handleLanguageChange('UKR')}>УКР</span>
                    <span> | </span>
                    <span className={currentLanguage === 'ENG' ? 'active_language' : ''} onClick={() => handleLanguageChange('ENG')}>ENG</span>
                </div>
                <div className="container_header_nav">
                    <nav className="header_nav">
                        <ul className="header_list">
                            <li className="header_item">
                                <Button buttonClass="header_button_main" handleClick={handleGoToRegisterPage}>Sign up</Button>
                                <Button buttonClass="header_button_main" handleClick={handleGoToAuthPage}>Sign in</Button>
                                <Button buttonClass="header_button_main" handleClick={handleGoToContactPage}>Contacts</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>)
}