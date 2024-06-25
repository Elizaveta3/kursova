import logo from './LOGO 2.svg';
import Button from '../Button/Button';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import i18next from '../../i18n';

export default function Header() {
    const navigate = useNavigate();

    const handleGoToMainPage = () => {
        navigate('/');
    };

    const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

    return (
        <header className="header">
            <div className="wrapper">
                <div className="header_wrapper">
                    <div className="header_logo">
                        <a href="/" className="header_logo_link">
                            <img src={logo} alt="logo" className="header_logo_pic" />
                        </a>
                    </div>
                    <div className="language_switcher_light">
                        <span className={currentLanguage === 'ua' ? 'active_language' : ''} onClick={() => i18next.changeLanguage('ua')}>УКР</span>
                        <span> | </span>
                        <span className={currentLanguage === 'en' ? 'active_language' : ''} onClick={() => i18next.changeLanguage('en')}>ENG</span>
                    </div>
                    <div className="container_header_nav">
                        <nav className="header_nav">
                            <ul className="header_list">
                                <li className="header_item">
                                    <Button buttonClass="header_button" handleClick={handleGoToMainPage}>Main page</Button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
