import React from 'react'
import HeaderProfile from '../components/HeaderProfile/HeaderProfile'

import {  Link, useNavigate } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();

    const handleGoToMain = () => {
        navigate('/');
    };
    const handleGoToAuthPage = () => {
        navigate('/auth');
    };
    return(
        <body className="page_profile">
            <HeaderProfile click1={handleGoToMain} click2={handleGoToAuthPage} child1="Щоденник" child2="Авторизація"></HeaderProfile>
   
        <section class="profile">
        <div className="form_profile">
                            
        </div>

        </section>
    
        </body>
    )

}