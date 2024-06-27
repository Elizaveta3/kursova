import logo from './LOGO 2.svg'
import Button from '../Button/Button'
import './HeaderProfile.css'
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';
import i18next from '../../i18n';

export default function HeaderProfile({ click1, click2, child1, child2 }) {

    const { currentLanguage } = useContext(LanguageContext);

    return (<header className="header_profile">
        <div className="wrapper_profile">
            <div className="header_wrappper_profile">
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
                    <nav className="header_nav_profile">
                        <ul className="header_list_profile">
                            <li className="header_item_profile">
                                <Button buttonClass="header_button_profile" handleClick={click1}>{child1}</Button>
                                <Button buttonClass="header_button_profile" handleClick={click2}>{child2}</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>)
}