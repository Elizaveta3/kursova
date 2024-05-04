import React, { useState, useEffect } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Autocomplete} from '@mui/material/Autocomplete';
import {Box} from '@mui/system';

export const DiaryPage = () => {
    const navigate = useNavigate();
    const [showText1, setShowText1] = useState(true);
    const [showText2, setShowText2] = useState(true);
    const [showSearch1, setShowSearch1] = useState(false);
    const [showSearch2, setShowSearch2] = useState(false);
    const [jsonResults, setJsonResults] = useState([]);

    useEffect

    const handleGoToProfile = () => {
        navigate('/profile');
    };

    const handleGoToAuthPage = () => {
        navigate('/auth');
    };

    const handlePlusButtonClick1 = () => {
        setShowText1(false);// Змінюємо стан, щоб приховати текст у секції їжі
        setShowSearch1(true);
    };

    const handlePlusButtonClick2 = () => {
        setShowText2(false); // Змінюємо стан, щоб приховати текст у секції активностей
        setShowSearch2(true);
    };

    return (
        <div className="page_diary">
            <HeaderProfile click1={handleGoToProfile} click2={handleGoToAuthPage} child1="Профіль" child2="Вийти" />
            <div className="form_diary">
                <section className='section_diary'>
                    <p className='text_diary' style={{ marginRight: '465px' }}>Їжа:</p>
                    {showText1 && <p className='little_text_diary'>Натисніть, щоб обрати:</p>}
                    {showSearch1 && <p className='little_text_diary'>Search</p>}
                    <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick1}>+</Button>
                </section>
                <section className='section_diary'>
                    <p className='text_diary'>Активності:</p>
                    {showText2 && <p className='little_text_diary'>Натисніть, щоб обрати:</p>}
                    {showSearch2 && <p className='little_text_diary'>Search</p>}
                    <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick2}>+</Button>
                </section>
            </div>
            <Button buttonClass="submit_button_diary">Підтвердити</Button>
        </div>
    );
};
