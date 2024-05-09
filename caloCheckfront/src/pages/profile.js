import React, { useEffect, useState } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import Button from '../components/Button/Button';

import {useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';


export const Profile = () => {
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)

    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/authEnter');
    };


    return (
        <>
            <body className="page_profile">
                <HeaderProfile click1={handleGoToDiary} click2={handleGoToAuthPage} child1="Щоденник" child2="Вийти"></HeaderProfile>
                <main className="main">
                    <section>
                        <div className="form_profile">
                            <h1>{currentUser.userName}</h1>
                            <div>
                                <p>Gender</p>
                                <p>{currentUser.gender}</p>
                                <p>Age</p>
                                <p>...</p>
                                <p>Weight</p>
                                <p>...</p>
                                <p>Height</p>
                                <p>...</p>
                            </div>
                        </div>
                    </section>
                </main>
            </body>
        </>
    )
}
