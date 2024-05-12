import React, { useEffect, useState } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
// import Button from '../components/Button/Button';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [profileData, setProfileData] = useState(null);
    const [secondResponse, setSecondResponse] = useState(null);

    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/authEnter');
    };

    useEffect(() => {
        const accountId = currentUser._id;

        // Виконання двох асинхронних запитів паралельно
        Promise.all([
            fetch(`/auth/profile/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            fetch(`/auth/profile/calo/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([profileDataResponse, secondResponseData]) => {
                setProfileData(profileDataResponse);
                setSecondResponse(secondResponseData);
                console.log('Second response data:', secondResponseData);
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
                    child1="Diary"
                    child2="Log out"
                ></HeaderProfile>
                <main className="main">
                    <section>
                        <div className="form_profile">
                            <h1>@{currentUser.userName}</h1>
                            <section className='profile_section_calories'>
                                <div className='profile_calories_user'>
                                    <p>цифра</p>
                                    <p>eaten</p>
                                </div>
                                <div>{secondResponse && secondResponse.caloriesNorm && (
                                    <p className='profile_calories'>{secondResponse.caloriesNorm}</p>
                                )}</div>
                                <div className='profile_calories_user'>
                                    <p>цифра</p>
                                    <p >burned</p>
                                </div>
                            </section>

                        <section className='profile_section_inf'>
                            <div className="profile_row">
                                <p className='profile_item'>Gender:</p>
                                {/* Перевірка, чи є дані профілю і чи є значення гендера */}
                                {profileData && profileData.gender && (
                                    <p className='profile_user_info'>{profileData.gender}</p>
                                )}
                                <p className='profile_item'>Age:</p>
                                {profileData && profileData.age && (
                                    <p className='profile_user_info'>{profileData.age}</p>
                                )}
                            </div>
                            <div className="profile_row">
                                <p className='profile_item'>Weight:</p>
                                {profileData && profileData.weight && (
                                    <p className='profile_user_info'>{profileData.weight}</p>
                                )}
                                <p className='profile_item'>Height:</p>
                                {profileData && profileData.height && (
                                    <p className='profile_user_info'>{profileData.height}</p>
                                )}
                            </div>
                            </section>
                            <div className='profile_goal'>
                                <p className='profile_item'>My goal:</p>
                                {profileData && profileData.goal && (
                                    <p className='profile_user_info'>{profileData.goal}</p>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </body>
        </>
    );
};
