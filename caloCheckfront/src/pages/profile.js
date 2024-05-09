import React, { useEffect, useState } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import Button from '../components/Button/Button';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [profileData, setProfileData] = useState(null);

    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/authEnter');
    };

    useEffect(() => {
        const accountId = currentUser._id;
        fetch(`/auth/profile/${accountId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(profileData => {
                setProfileData(profileData); // Зберігаємо дані профілю у стані
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, [currentUser._id]);

    return (
        <>
            <body className="page_profile">
                <HeaderProfile
                    click1={handleGoToDiary}
                    click2={handleGoToAuthPage}
                    child1="Щоденник"
                    child2="Вийти"
                ></HeaderProfile>
                <main className="main">
                    <section>
                        <div className="form_profile">
                            <h1>{currentUser.userName}</h1>
                            <div>
                                <p>Gender</p>
                                {/* Перевірка, чи є дані профілю і чи є значення гендера */}
                                {profileData && profileData.gender && (
                                    <p>{profileData.gender}</p>
                                )}
                                <p>Age</p>
                                {profileData && profileData.age && (
                                    <p>{profileData.age}</p>
                                )}
                                <p>Weight</p>
                                {profileData && profileData.weight && (
                                    <p>{profileData.weight}</p>
                                )}
                                <p>Height</p>
                                {profileData && profileData.height && (
                                    <p>{profileData.height}</p>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </body>
        </>
    );
};
