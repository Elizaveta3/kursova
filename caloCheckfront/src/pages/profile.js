import React from 'react'
import HeaderProfile from '../components/HeaderProfile/HeaderProfile'

import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();

    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/auth');
    };
    return (
        <div className="page_profile">
            <HeaderProfile click1={handleGoToDiary} click2={handleGoToAuthPage} child1="Щоденник" child2="Вийти"></HeaderProfile>

            <section className="profile">
                <div className="form_profile">

                </div>

            </section>

        </div>
    )

}