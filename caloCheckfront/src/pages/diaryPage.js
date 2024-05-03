import React from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import {useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';

export const DiaryPage = () => {
    const navigate = useNavigate();

    const handleGoToProfile = () => {
        navigate('/profile');
    };
    const handleGoToAuthPage = () => {
        navigate('/auth');
    };
    return (

        <body className="page_diary">
                 <HeaderProfile click1={handleGoToProfile} click2={handleGoToAuthPage} child1="Профіль" child2="Вийти"></HeaderProfile>
                
                 <div className="form_diary">
                    <p className='text_diary'>Їжа:</p>
                    <p className='text_diary'>Активності:</p>
                            
                </div>

                <Button buttonClass = "submit_button_diary" >Підтвердити</Button>

            </body>
        

      
    )};