import React, { useState, useEffect } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import jsonData from '../data/calories.json';

export const DiaryPage = () => {
    const navigate = useNavigate();
    const [showText1, setShowText1] = useState(true);
    const [showText2, setShowText2] = useState(true);
    const [showSearch1, setShowSearch1] = useState(false);
    const [showSearch2, setShowSearch2] = useState(false);
    const [jsonResults, setJsonResults] = useState([]);

    useEffect(() => {
        // Отримуємо лише назви продуктів і зберігаємо їх у стані
        const productNames = jsonData.map(item => item.FoodItem);
        setJsonResults(productNames);
    }, []);

    const handleGoToProfile = () => {
        navigate('/profile');
    };

    const handleGoToAuthPage = () => {
        navigate('/auth');
    };

    const handlePlusButtonClick1 = () => {
        setShowText1(false); // Змінюємо стан, щоб приховати текст у секції їжі
        setShowSearch1(true);
    };

    const handleCancel1 = () => {
        setShowText1(true); // Показуємо текст знову
        setShowSearch1(false);
    };

    const handlePlusButtonClick2 = () => {
        setShowText2(false); // Змінюємо стан, щоб приховати текст у секції активностей
        setShowSearch2(true);
    };

    const handleCancel2 = () => {
        setShowText2(true); // Показуємо текст знову
        setShowSearch2(false);
    };

    return (
        <div className="page_diary">
            <HeaderProfile click1={handleGoToProfile} click2={handleGoToAuthPage} child1="Profile" child2="Log out" />
            <div className="form_diary">
                <section className='section_diary'>
                    <p className='text_diary' style={{ marginRight: '465px' }}>Food:</p>
                    {showSearch1 && (
                        <Autocomplete
                        options={jsonResults}
                        sx={{ width: 600 }} // Змінено ширину на 400 пікселів
                        renderInput={(params) => <TextField {...params} label="Product search" />}
                    />
                    )}
                    {showText1 && <p className='little_text_diary'>Click here to select:</p>}
                    {showSearch1 ? (
                        <Button buttonClass="cancel_button_diary" handleClick={handleCancel1}>Cancel</Button>
                    ) : (
                        <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick1}>+</Button>
                    )}
                    
                </section>
                <section className='section_diary'>
                    <p className='text_diary'>Activities:</p>
                    {showSearch2 && (
                        <Autocomplete
                            options={jsonResults}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Activities search" />}
                        />
                    )}
                    {showText2 && <p className='little_text_diary'>Click here to select:</p>}
                    {showSearch2 ? (
                        <Button buttonClass="cancel_button_diary" handleClick={handleCancel2}>Cancel</Button>
                    ) : (
                        <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick2}>+</Button>
                    )}
                </section>
            </div>
            <Button buttonClass="submit_button_diary">Submit</Button>
        </div>
    );
};
