// src/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';
import i18next from './i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

    useEffect(() => {
        const handleLanguageChange = () => {
            setCurrentLanguage(i18next.language);
        };

        i18next.on('languageChanged', handleLanguageChange);

        return () => {
            i18next.off('languageChanged', handleLanguageChange);
        };
    }, []);

    const changeLanguage = (language) => {
        i18next.changeLanguage(language);
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
